import { useUser } from "@clerk/nextjs";
import { db } from "@/db";
export default async function HostUserAsync() {
  const { isSignedIn, user, isLoaded } = useUser();
  const hostId = await db.query(
    `SELECT id FROM users_hosts WHERE clecks_user_id = ${user.id} `
  );
  const hostRooms = await db.query(
    `SELECT * FROM rooms WHERE owner_id = ${hostId}`
  );
  const roomImages = await db.query(
    `SELECT * FROM media WHERE image_id = ${hostId}`
  );
  if (hostId.rowCount === 0) {
    await db.query(`INSERT INTO users_hosts (clecks_user_id,name,email)
      VALUES (${hostId},${user.username},${user.primaryEmailAddress})`);
  }
  function handleImage(homeId) {
    return roomImages.rows.filter((image) => image.home_id === homeId);
  }

  //async function handleAddHost(){}
  if (!isLoaded) {
    return null;
  }

  if (hostId.rowCount!==0) {
    return (
      <div>
        <h2>Hello {user.fullName}!</h2>
        <p>Email: {user.primaryEmailAddress}</p>
        <p>Username: {user.username}</p>
        <button onClick={null}>Add Posting</button>
        <h1>Your Listings</h1>
        <div>
          {hostRooms.rows.map((room) => {
            return (
              <div key={room.id}>
                <h3>{room.address}</h3>
                <p>{room.hoome_type}</p>
                <p>{room.total_occupancy}</p>
                <p>{room.total_rooms}</p>
                <p>{room.price}</p>
                <p>{room.published_at}</p>
                <p>{room.updated_at}</p>
                <p>{room.summary}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <div>Not signed in</div>;
}
