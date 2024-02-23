import SaveReviewButton from "@/components/SaveReviewButton";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import "./addcat.css";

export default function AddComment({ params }) {
  console.log("rating", params);
  async function handleAddComment(formData) {
    "use server";

    // get the comment from our formData object
    const comment = formData.get("comment");
    const rating = formData.get("rating");
    // await db.query`INSERT INTO reviews (rating, comment, room_id) VALUES (${rating},${comment},${params.homeId})`;
    const insertReviewQuery = `
    INSERT INTO reviews (rating, comment, room_id)
    VALUES ($1, $2, $3)
  `;

    await db.query(insertReviewQuery, [rating, comment, params.homeId]);

    // revalidate the path so the new item shows
    revalidatePath(`/pages/posts/${params.homeId}`);

    // take me to the home pagen
    redirect(`/pages/posts/${params.homeId}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Add Comment</h2>
      <form action={handleAddComment} className="max-w-md">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Add Comment
          </label>
          <input
            name="comment"
            id="comment"
            placeholder="comment"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            name="rating"
            id="rating"
            placeholder="rating"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <SaveReviewButton />
      </form>
    </div>
  );
}
