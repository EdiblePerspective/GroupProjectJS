import { db } from "@/db";
import Link from "next/link";
import SlideSingleHome from "@/components/SlideSingleHome";
import HostName from "@/components/HostName";
export default async function SingleHomePage({ params }) {
  console.log("Home ID:", params.homeId);

  const homeResult = await db.query(
    `SELECT * FROM rooms WHERE rooms.id = ${params.homeId}`
  );
  const home = homeResult.rows[0];
  console.log("home:", home);
  const imagesResult = await db.query(
    `SELECT * FROM media WHERE media.room_id = ${params.homeId}`
  );
  // const reviewsResult = await db.query`SELECT * FROM reviews
  //   WHERE reviews.room_id = ${params.homeId}`;
  const reviewsResult = await db.query(
    "SELECT * FROM reviews WHERE reviews.room_id = $1",
    [params.homeId]
  );

  return (
    <div className="container">
      <div className="slider-container">
        <SlideSingleHome
          homeImages={imagesResult.rows.map((image) => image.url_image)}
        />
        <Link
          color="gres"
          href={`/pages/posts/${params.homeId}/rating`}
          className="rate-link"
        >
          Rate this Home
        </Link>
        <div className="reviews-container">
          {reviewsResult.rows.map((review) => (
            <div key={review.id + review.comment} className="comment">
              <div className="rating-stars">
                {Array.from({ length: review.rating }, (_, index) => (
                  <span key={index} className="star">
                    ⭐️
                  </span>
                ))}
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="content-container">
        <div className="recipeInfo">
          <h3 className="recipeInfoname">{home.hoome_type}</h3>
          <p className="recipeInfoptag">{home.total_occupancy} guests</p>
          <p className="recipeInfoptag">{home.total_rooms} bedrooms</p>
          <p className="recipeInfoptag">{home.summary}</p>
          <p className="recipeInfoptag">Address :{home.address}</p>
          <p className="recipeInfoptag">From {home.price}£ a night</p>
          <p>Cntact the owner for Booking information:</p>
          <HostName hostId={home.owner_id} />
        </div>
      </div>
    </div>
  );
}
