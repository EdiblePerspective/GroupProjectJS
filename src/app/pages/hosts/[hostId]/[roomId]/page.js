import { db } from "@/db";
import Link from "next/link";
import SlideSingleHome from "@/components/SlideSingleHome";
import HostName from "@/components/HostName";
export default async function SingleHomePage({ params }) {
  console.log("Home ID:", params);
  const homeResult = await db.query("SELECT * FROM rooms WHERE rooms.id = $1", [
    params.roomId,
  ]);

  // const homeResult = await db.query(
  //   `SELECT * FROM rooms WHERE rooms.id = ${params.hostId}`
  // );
  const home = homeResult.rows[0];
  console.log("home:", home);
  const imagesResult = await db.query(
    `SELECT * FROM media WHERE media.room_id = ${params.roomId}`
  );
  const reviewsResult = await db.query(`SELECT * FROM reviews
    WHERE reviews.room_id = ${params.roomId}`);

  return (
    <div className="container">
      <div className="recipeInfo">
        <h3 className="recipeInfoname">{home.hoome_type}</h3>
        <SlideSingleHome
          homeImages={imagesResult.rows.map((image) => image.url_image)}
        />
      </div>
      <div>
        <p className="recipeInfoptag">{home.total_occupancy}</p>
        <p className="recipeInfoptag">{home.total_rooms}</p>
        <p className="recipeInfoptag">{home.summary}</p>
        <p className="recipeInfoptag">{home.address}</p>
        <p className="recipeInfoptag">{home.price}</p>
        <p className="recipeInfoptag">{home.address}</p>
        <p>My Contact:</p>
        <HostName hostId={home.owner_id} />
      </div>
      <div>
        <Link
          href={`/pages/hosts/hostpage/${params.hostId}/${params.roomId}/addImage`}
        >
          Add More Images
        </Link>
      </div>
      <div className="reviews-container">
        {reviewsResult.rows.map((review) => (
          <div key={review.id + review.content} className="comment">
            <p>{review.comment}</p>
            <p>{review.rating}</p>
            <Link href={`/pages/posts/comments/${params.roomId}/rating`}>
              Rate this Home
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
