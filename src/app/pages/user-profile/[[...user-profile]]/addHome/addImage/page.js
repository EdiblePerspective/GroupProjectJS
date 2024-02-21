import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SaveImageButton from "@/components/SaveImageButton";
export default async function AddImage(params) {
  async function handleAddImage(formData) {
    "use server";
    // get the comment from our formData object
    const url_image = formData.get("url_image");
    await db.query.query(
      `INSERT INTO media (url_image, room_id) VALUES ($1, $2)`,
      [url_image, params.homeId]
    );

    // revalidate the path so the new item shows
    revalidatePath(`/`);

    // take me to the home pagen
    redirect(`/`);
  }

  return (
    <div>
      <h2>Add Image</h2>
      <form action={handleAddImage} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="url_image">Add Photo</label>
          <input
            name="url_image"
            id="url_image"
            placeholder="url_image"
            required
          />
        </div>

        <SaveImageButton />
      </form>
    </div>
  );
}
