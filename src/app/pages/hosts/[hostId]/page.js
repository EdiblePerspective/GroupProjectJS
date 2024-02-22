import { db } from "@/db";
import Link from "next/link";
import SlideSingleHome from "@/components/SlideSingleHome";
import HostName from "@/components/HostName";
export default async function SingleHomePage({ params }) {
  console.log("Home ID:", params.id);

  const homeResult = await db.query(
    `SELECT * FROM rooms WHERE rooms.id = ${params.id}`
  );
  const home = homeResult.rows[0];
  console.log("home:", home);
  const imagesResult = await db.query(
    `SELECT * FROM media WHERE media.image_id = ${params.id}`
  );
  const reviewsResult = await sql`SELECT * FROM reviews
    WHERE reviews.room_id = ${params.id}`;

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
        <p>Cntact the owner:</p>
        <HostName hostId={home.owner_id} />
      </div>
      <div className="reviews-container">
        {reviewsResult.rows.map((review) => (
          <div key={review.id + review.content} className="comment">
            <p>{review.comment}</p>
            <p>{review.rating}</p>
            <Link href={`/pages/posts/comments/${params.id}/rating`}>
              Rate this Home
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
