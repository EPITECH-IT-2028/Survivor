import { Mail } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 md:max-w-4xl lg:max-w-6xl">
      <h1 className="mb-6 text-start text-6xl font-bold">
        Our Vision and Mission
      </h1>
      <p className="text-justify text-lg leading-relaxed text-gray-700">
        This web platform is dedicated to showcasing the projects that emerge
        from the incubator, acting as a window into the creativity and
        entrepreneurial spirit of its startups. <br />
        <br />
        Its primary goal is to provide greater visibility to project leaders and
        their ventures, helping them reach a broader audience and strengthen
        their market presence. <br />
        Beyond visibility, the platform serves as a bridge between startups and
        key stakeholders such as investors, strategic partners, and potential
        clients, fostering opportunities for growth and collaboration. <br />
        <br />
        It also aims to promote a culture of innovation by highlighting
        cutting-edge ideas and success stories, inspiring both the
        entrepreneurial community and external supporters. <br />
        To remain engaging and relevant, the platform ensures dynamic and
        regular updates on projects, highlighting milestones, achievements, and
        ongoing progress, thereby creating a living showcase of innovation in
        action.
      </p>
      <h1 className="mt-24 mb-12 text-start text-5xl font-bold">Our Team</h1>
      <h2 className="mb-4 border-b-2 border-primary pb-2 text-2xl font-semibold text-primary">
        Managers
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {["Elena Enka", "Bylel Jourdin", "Javier Barrera"].map((name) => (
          <div key={name} className="rounded-lg bg-primary/20 p-4 text-center">
            <p className="font-medium">{name}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-20 mb-4 border-b-2 border-accent-foreground pb-2 text-2xl font-semibold text-accent-foreground">
        Developers
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          "Nolann Dubos",
          "Quentin Lapierre",
          "Etienne Labarbe",
          "Arthur Guerinault",
        ].map((name) => (
          <div
            key={name}
            className="rounded-lg bg-accent-foreground/20 p-4 text-center"
          >
            <p className="font-medium">{name}</p>
          </div>
        ))}
      </div>
      <h1 className="mt-24 mb-12 text-start text-5xl font-bold">Contact Us</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          "elena.enka@jeb-incubator.com",
          "bylel.jourdin@jeb-incubator.com",
          "javier.barrera@jeb-incubator.com",
        ].map((email, idx, arr) => (
            // checkpoint
          <div
            key={email}
            className="group relative cursor-pointer px-8 py-4"
          >
            <Link
              href={`mailto:${email}`}
              className={"gap-2 text-sm font-medium text-foreground transition-colors duration-100 hover:text-primary" + (idx === arr.length - 1 ? "col-span-2" : "")}
            >
              <span className="absolute inset-0 rounded-lg bg-accent/40 transition-all duration-100 group-hover:scale-x-105 group-hover:bg-accent/75 hover:scale-y-95"></span>
              <span className="relative z-10 flex items-center gap-2">
                <Mail />
                {email}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
