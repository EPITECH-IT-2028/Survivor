'use server';

import { NextResponse } from 'next/server';
import sql from '@/lib/db';


async function fetchDataFromExternalAPI(endpoint: string) {
  const response = await fetch(`https://api.jeb-incubator.com/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Group-Authorization': `${process.env.JEB_API_KEY}`
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`Failed to fetch ${endpoint}:`, response.status, text);
    return null;
  }

  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Invalid JSON from ${endpoint}:`, err);
    return null;
  }
}

async function fetchImageFromExternalAPI(endpoint: string) {
  const response = await fetch(`https://api.jeb-incubator.com/${endpoint}`, {
    method: 'GET',
    headers: {
      'X-Group-Authorization': `${process.env.JEB_API_KEY}`
    },
  });

  if (!response.ok) {
    console.error(`Failed to fetch image ${endpoint}:`, response.status);
    return null;
  }

  try {
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (err) {
    console.error(`Failed to process image from ${endpoint}:`, err);
    return null;
  }
}


export async function POST() {
  try {
    if (!process.env.POSTGRES_URL) {
      return NextResponse.json({ error: 'Database URL not configured' }, {
        status: 500,
      });
    }

    const db = sql;

    if (db === null) {
      return NextResponse.json({ error: 'Database connection failed' }, {
        status: 500,
      });
    }

    const responseInvestors = await fetchDataFromExternalAPI('investors');

    if (!responseInvestors) {
      return NextResponse.json({ error: 'Failed to fetch investors from external API' }, {
        status: 500,
      });
    }

    const investors = responseInvestors;

    for (const investor of investors) {
      await db`INSERT INTO investors (name, legal_status, address, email, phone, created_at, description,
      investor_type, investment_focus, legacy_id)
      VALUES (${investor.name}, ${investor.legal_status}, ${investor.address}, ${investor.email}, ${investor.phone},
      ${investor.created_at}, ${investor.description}, ${investor.investor_type}, ${investor.investment_focus}, ${investor.id})
      ON CONFLICT (legacy_id) DO UPDATE
      SET name = EXCLUDED.name,
      legal_status = EXCLUDED.legal_status,
      address = EXCLUDED.address,
      phone = EXCLUDED.phone,
      created_at = EXCLUDED.created_at,
      description = EXCLUDED.description,
      investor_type = EXCLUDED.investor_type,
      investment_focus = EXCLUDED.investment_focus,
      email = EXCLUDED.email`;
    }

    const investorIds = await db`SELECT legacy_id FROM investors ORDER BY legacy_id`;

    for (const i of investorIds) {
      console.log(`Fetching image for investor ID ${i.legacy_id}`);

      const imageBuffer = await fetchImageFromExternalAPI(`investors/${i.legacy_id}/image`);

      if (imageBuffer) {
        await db`UPDATE investors SET image = ${imageBuffer}
          WHERE legacy_id = ${i.legacy_id}`;
        console.log(`Image updated for investor ID ${i.legacy_id}`);
      } else {
        console.log(`No image found for investor ID ${i.legacy_id}`);
      }
    }

    const startupResponse = await fetchDataFromExternalAPI('startups');

    if (!startupResponse) {
      return NextResponse.json({ error: 'Failed to fetch startups from external API' }, {
        status: 500,
      });
    }

    const startups = startupResponse;

    for (const startup of startups) {
      await db`INSERT INTO startups (name, legal_status, address, email, phone, sector, maturity, legacy_id)
      VALUES (${startup.name}, ${startup.legal_status}, ${startup.address}, ${startup.email}, ${startup.phone},
      ${startup.sector}, ${startup.maturity}, ${startup.id})
      ON CONFLICT (legacy_id) DO UPDATE SET
      name = EXCLUDED.name,
      legal_status = EXCLUDED.legal_status,
      address = EXCLUDED.address,
      phone = EXCLUDED.phone,
      sector = EXCLUDED.sector,
      maturity = EXCLUDED.maturity,
      email = EXCLUDED.email`;
    }

    const startupIds = await db`SELECT legacy_id FROM startups ORDER BY legacy_id`;

    for (const s of startupIds) {
      let startup = await fetchDataFromExternalAPI(`startups/${s.legacy_id}`);
      while (!startup) {
        console.log(`Retrying fetch for startup ID ${s.legacy_id}`);
        await new Promise(res => setTimeout(res, 2000));
        startup = await fetchDataFromExternalAPI(`startups/${s.legacy_id}`);
      }

      const details = startup;

      for (const founder of details.founders || []) {
        await db`INSERT INTO founders(name, legacy_id)
          VALUES (${founder.name}, ${founder.id})
          ON CONFLICT (legacy_id) DO UPDATE SET
          name = EXCLUDED.name`;

        await db`UPDATE startups SET description = ${details.description},
        created_at = ${details.created_at},
        website_url = ${details.website_url},
        social_media_url = ${details.social_media_url},
        project_status = ${details.project_status},
        needs = ${details.needs}
        WHERE legacy_id = ${s.legacy_id}`;

        await db`INSERT INTO founder_startup (founder_id, startup_id)
        SELECT founders.id, startups.id
        FROM founders, startups
        WHERE founders.legacy_id = ${founder.id}
          AND startups.legacy_id = ${s.legacy_id}
        ON CONFLICT (founder_id, startup_id) DO NOTHING`;
      }
    }

    const foundersWithStartupIds = await db`
      SELECT f.legacy_id as founder_legacy_id, s.legacy_id as startup_legacy_id 
      FROM founders f
      JOIN founder_startup fs ON f.id = fs.founder_id
      JOIN startups s ON s.id = fs.startup_id
      ORDER BY f.legacy_id`;

    for (const founder of foundersWithStartupIds) {
      console.log(`Fetching image for founder ID ${founder.founder_legacy_id} from startup ${founder.startup_legacy_id}`);

      const imageBuffer = await fetchImageFromExternalAPI(`startups/${founder.startup_legacy_id}/founders/${founder.founder_legacy_id}/image`);

      if (imageBuffer) {
        await db`UPDATE founders SET image = ${imageBuffer}
          WHERE legacy_id = ${founder.founder_legacy_id}`;
        console.log(`Image updated for founder ID ${founder.founder_legacy_id}`);
      } else {
        console.log(`No image found for founder ID ${founder.founder_legacy_id}`);
      }
    }

    const response = await fetchDataFromExternalAPI('users');

    if (!response) {
      return NextResponse.json({ error: 'Failed to fetch data from external API' }, {
        status: 500,
      });
    }

    const users = response;

    for (const user of users) {

      const founderLegacyId = await db`SELECT id FROM founders WHERE legacy_id = ${user.founder_id}`;

      const investorLegacyId = await db`SELECT id FROM investors WHERE legacy_id = ${user.investor_id}`;

      await db`INSERT INTO users(name, email, role, founder_id, investor_id, legacy_id)
        VALUES(${user.name}, ${user.email}, ${user.role},
        ${founderLegacyId.length > 0 ? founderLegacyId[0].id : null},
        ${investorLegacyId.length > 0 ? investorLegacyId[0].id : null},
        ${user.id})
        ON CONFLICT(email) DO UPDATE SET
          name = EXCLUDED.name,
          role = EXCLUDED.role,
          founder_id = EXCLUDED.founder_id,
          investor_id = EXCLUDED.investor_id,
          legacy_id = EXCLUDED.legacy_id`;
    }

    const userIds = await db`SELECT legacy_id FROM users ORDER BY legacy_id`;

    for (const u of userIds) {
      console.log(`Fetching image for user ID ${u.legacy_id}`);

      const imageBuffer = await fetchImageFromExternalAPI(`users/${u.legacy_id}/image`);

      if (imageBuffer) {
        await db`UPDATE users SET image = ${imageBuffer}
          WHERE legacy_id = ${u.legacy_id}`;
        console.log(`Image updated for user ID ${u.legacy_id}`);
      } else {
        console.log(`No image found for user ID ${u.legacy_id}`);
      }
    }

    const eventsResponse = await fetchDataFromExternalAPI('events');

    if (!eventsResponse) {
      return NextResponse.json({ error: 'Failed to fetch events from external API' }, {
        status: 500,
      });
    }

    const events = eventsResponse;

    for (const event of events) {
      await db`INSERT INTO events(name, dates, location, description, event_type, target_audience, legacy_id)
        VALUES(${event.name}, ${event.dates}, ${event.location}, ${event.description}, ${event.event_type},
          ${event.target_audience}, ${event.id})
      ON CONFLICT(name, dates) DO NOTHING`;
    }

    const eventIds = await db`SELECT legacy_id FROM events ORDER BY legacy_id`;

    for (const e of eventIds) {
      console.log(`Fetching image for event ID ${e.legacy_id}`);

      const imageBuffer = await fetchImageFromExternalAPI(`events/${e.legacy_id}/image`);

      if (imageBuffer) {
        await db`UPDATE events SET image = ${imageBuffer}
          WHERE legacy_id = ${e.legacy_id}`;
        console.log(`Image updated for event ID ${e.legacy_id}`);
      } else {
        console.log(`No image found for event ID ${e.legacy_id}`);
      }
    }

    const partnersResponse = await fetchDataFromExternalAPI('partners');

    if (!partnersResponse) {
      return NextResponse.json({ error: 'Failed to fetch partners from external API' }, {
        status: 500,
      });
    }

    const partners = partnersResponse;

    for (const partner of partners) {
      await db`INSERT INTO partners(name, legal_status, address, email, phone, created_at, description, partnership_type, legacy_id)
        VALUES(${partner.name}, ${partner.legal_status}, ${partner.address}, ${partner.email}, ${partner.phone},
          ${partner.created_at}, ${partner.description}, ${partner.partnership_type}, ${partner.id})
      ON CONFLICT (legacy_id) DO UPDATE SET
          name = EXCLUDED.name,
          legal_status = EXCLUDED.legal_status,
          address = EXCLUDED.address,
          phone = EXCLUDED.phone,
          created_at = EXCLUDED.created_at,
          description = EXCLUDED.description,
          partnership_type = EXCLUDED.partnership_type,
          email = EXCLUDED.email`;
    }

    const newsResponse = await fetchDataFromExternalAPI('news');

    if (!newsResponse) {
      return NextResponse.json({ error: 'Failed to fetch news from external API' }, {
        status: 500,
      });
    }

    const newsItems = newsResponse;

    for (const newsItem of newsItems) {

      const startupId = await db`SELECT id FROM startups WHERE legacy_id = ${newsItem.startup_id}`;

      await db`INSERT INTO news(location, title, category, startup_id, news_date, description, legacy_id)
        VALUES(${newsItem.location}, ${newsItem.title}, ${newsItem.category},
          ${startupId.length > 0 ? startupId[0].id : null}, ${newsItem.news_date}, 'no description', ${newsItem.id})
        ON CONFLICT(legacy_id) DO UPDATE SET
          location = EXCLUDED.location,
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          startup_id = EXCLUDED.startup_id,
          news_date = EXCLUDED.news_date`;
    }

    const newsIds = await db`SELECT legacy_id FROM news ORDER BY legacy_id`;

    for (const n of newsIds) {
      let newsDetail = await fetchDataFromExternalAPI(`news/${n.legacy_id}`);
      while (!newsDetail) {
        await new Promise(res => setTimeout(res, 2000));
        newsDetail = await fetchDataFromExternalAPI(`news/${n.legacy_id}`);
      }

      const detail = newsDetail;

      await db`UPDATE news SET description = ${detail.description}
        WHERE legacy_id = ${n.legacy_id}`;
    }

    for (const n of newsIds) {
      console.log(`Fetching image for news ID ${n.legacy_id}`);

      const imageBuffer = await fetchImageFromExternalAPI(`news/${n.legacy_id}/image`);

      if (imageBuffer) {
        await db`UPDATE news SET image = ${imageBuffer}
          WHERE legacy_id = ${n.legacy_id}`;
        console.log(`Image updated for news ID ${n.legacy_id}`);
      } else {
        console.log(`No image found for news ID ${n.legacy_id}`);
      }
    }

    return NextResponse.json({ message: 'Data synchronized successfully' });
  } catch (error) {
    console.error('Error syncing data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
