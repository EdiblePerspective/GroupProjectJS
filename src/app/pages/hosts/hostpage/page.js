import { auth } from "@clerk/nextjs";
import { db } from "@/db";
import Link from "next/link";
import SlideHomes from "@/components/SlideHomes";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import EditProfileButton from "../../components/EditProfileButton";

export default async function HostPage() {
  const { userId } = auth();
  console.log("userIs", userId);
  const queryText = `
  SELECT *
  FROM users_hosts
  WHERE clecks_user_id = $1
`;

  const hostResult = await db.query(queryText, [userId]);
  // let hostResult =
  //   await db.query`SELECT * FROM users_hosts WHERE users_hosts.clecks_user_id = ${userId}`;
  let singleHost = hostResult.rows[0];
  console.log("host", singleHost);

  const queryText1 = `
  SELECT *
  FROM rooms
  WHERE owner_id = $1
`;

  const roomsResult = await db.query(queryText1, [singleHost.id]);
  console.log("room1", roomsResult);
  const roomImages = await db.query(`SELECT * FROM media`);
  function handleImage(homeId) {
    return roomImages.rows.filter((image) => image.room_id === homeId);
  }
  return (
    <div className="profileContainer">
      <div className="leftPanel">
        <h2>{singleHost.name}</h2>
        <img src={singleHost.profile_image} className="profileImage" />
      </div>
      <div className="rightPanel">
        <p className="bio"> Email: {singleHost.email}</p>
        <p className="bio"> Phone: {singleHost.phone_number}</p>
        <p className="bio"> description: {singleHost.description}</p>
      </div>
      <Link href={`/pages/hosts/hostpage/${singleHost.id}/addHome`}>
        Add Home
      </Link>
      <div>
        {roomsResult.rows.map((room) => {
          // Get images for the current room
          const imagesForRoom = handleImage(room.id);

          console.log("image2", imagesForRoom, room.id);
          return (
            <div key={room.id}>
              <h4>{room.hoome_type}</h4>

              <SlideHomes
                homeImages={imagesForRoom.map((image) => image.url_image)}
              />

              <p>{room.price}</p>
              <Link href={`/pages/hosts/hostpage/${room.id}`}>
                Read more...
              </Link>
              <Link href="">Read more...</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}