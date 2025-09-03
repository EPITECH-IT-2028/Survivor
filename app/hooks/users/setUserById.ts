import { getSql } from '@/lib/db';
import { TUser } from '@/app/types/users';

export default async function setUserById(userNewData: TUser) {
  const sql = getSql();

  console.log("While update");
  const result = await sql`
    UPDATE users 
    SET 
    name = ${userNewData.name}, 
    role = ${userNewData.role},
    email = ${userNewData.email}
    WHERE id = ${userNewData.id}
  `;
  return result.at(0) ?? null;
}
