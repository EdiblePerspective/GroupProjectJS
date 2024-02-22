import { db } from "@/db";

export default async function HostName({ hostId }) {
  console.log("id:", hostId);
  const hostResult = await db.query(
    "SELECT * FROM users_hosts WHERE users_hosts.id = $1",
    [hostId]
  );

  // const hostResult = await db.query`SELECT * FROM users_hosts
  //   WHERE users_hosts.id = ${hostId}`;
  const hostProfile = hostResult.rows[0];

  return (
    <div>
      <p className="Hosts Name">{hostProfile.name}</p>
      <p className="Hosts Name">{hostProfile.email}</p>
    </div>
  );
}
