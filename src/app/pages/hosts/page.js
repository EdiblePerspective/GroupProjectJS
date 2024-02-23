import { auth } from "@clerk/nextjs";
import { db } from "@/db";
import Link from "next/link";
import SlideHomes from "@/components/SlideHomes";
import { revalidatePath } from "next/cache";

import "./hosts.css";
import { redirect } from "next/navigation";

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
  if (singleHost == null) {
    redirect("/pages/hosts/createHostProfile");
  }
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
    <div className="host-page">
      <div className="host-info-container">
        <div className="left-panel">
          <h2 className="name-title">{singleHost.name}</h2>
          <img
            src={singleHost.profile_image}
            className="profile-image"
            alt="Profile Image"
          />
        </div>
        <div className="right-panel">
          <div className="host-info">
            <p className="bio"> Email: {singleHost.email}</p>
            <p className="bio"> Phone: {singleHost.phone_number}</p>
            <p className="bio"> Description: {singleHost.description}</p>
          </div>
          <div className="add-posting-link read-more-link">
            <Link href={`/pages/hosts/${singleHost.id}/addHome`}>
              Add Posting
            </Link>
          </div>
        </div>
      </div>

      <div className="rooms-container">
        {roomsResult.rows.map((room) => (
          <div key={room.id} className="room-card">
            <h3>{room.hoome_type}</h3>
            <SlideHomes
              homeImages={handleImage(room.id).map((image) => image.url_image)}
            />
            <p>{room.price}£ per night</p>
            <Link
              href={`/pages/hosts/${singleHost.id}/${room.id}`}
              className="read-more-link"
            >
              Read more...
            </Link>
            <button className="wishlist-button">
              <i className="fas fa-heart"></i>
            </button>
          </div>
        ))}
            
      </div>
    </div>
  );
}
