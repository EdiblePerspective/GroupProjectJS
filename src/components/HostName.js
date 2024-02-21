import { db } from "@/db";

export default async function HostName({ hostId }) {
  // console.log("id:", recipeid);
  const hostResult = await sql`SELECT * FROM users_hosts
    WHERE users_hosts.id = ${hostId}`;
  const hostProfile = hostResult.rows[0];

  return (
    <div>
      <p className="Hosts Name">{hostProfile.name}</p>
      <p className="Hosts Name">{hostProfile.email}</p>
    </div>
  );
}
