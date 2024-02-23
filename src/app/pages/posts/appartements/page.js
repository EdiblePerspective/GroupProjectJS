import { db } from "@/db";
import SlideHomes from "@/components/SlideHomes";

// import { auth } from "@clerk/nextjs";
import Link from "next/link";
// import { notFound } from "next/navigation";

// this function takes 5 seconds to do display the Homes
async function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}

export default async function RoomsLists() {
  const rooms = await db.query(
    `SELECT * FROM rooms WHERE hoome_type ILIKE '%apartment%'`
  );
  const roomImages = await db.query(`SELECT * FROM media`);
  function handleImage(homeId) {
    return roomImages.rows.filter((image) => image.room_id === homeId);
  }
  console.log("images", roomImages);
  await delay();
  return (
    <div className="rooms-wrapper1">
      {rooms.rows.map((room) => {
        // Get images for the current room
        const imagesForRoom = handleImage(room.id);

        console.log("image1", imagesForRoom, room.id);
        return (
          <div key={room.id} className="room-container1">
            <h4>{room.hoome_type}</h4>

            <SlideHomes
              homeImages={imagesForRoom.map((image) => image.url_image)}
            />

            <p>From {room.price}£ a night</p>
            <Link href={`/pages/posts/${room.id}`} className="read-more-link">
              Read more...
            </Link>
          </div>
        );
      })}
    </div>
  );
}
