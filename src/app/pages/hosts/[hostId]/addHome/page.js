import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import SaveHomeButton from "@/components/SaveHomeButton";
export default async function AddHome({ params }) {
  console.log("params", params.hostId);
  async function handleAddRoom(formData) {
    "use server";
    // get the comment from our formData object
    const hoome_type = formData.get("hoome_type");
    const total_occupancy = formData.get("total_occupancy");
    const total_rooms = formData.get("total_rooms");
    const summary = formData.get("summary");
    const address = formData.get("address");
    const price = formData.get("price");
    const url_image = formData.get("url_image");
    const homeIdResult = await db.query(
      `INSERT INTO rooms (hoome_type, total_occupancy, total_rooms, summary, address, price,  owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        hoome_type,
        total_occupancy,
        total_rooms,
        summary,
        address,
        price,
        params.hostId,
      ]
    );
    const homeId = homeIdResult.rows[0].id;

    await db.query(`INSERT INTO media (url_image, room_id) VALUES ($1, $2)`, [
      url_image,
      homeId,
    ]);

    // revalidate the path so the new item shows
    revalidatePath(`/`);

    // take me to the home pagen
    redirect(`/`);
  }

  return (
    <div>
      <h2>Add Home</h2>
      <form action={handleAddRoom} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="hoome_type">hoome_type</label>
          <input
            name="hoome_type"
            id="hoome_type "
            placeholder="type of Home"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name">total_occupancy</label>
          <input
            type="text"
            name="total_occupancy"
            id="total_occupancy"
            placeholder="total_occupancy"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name">total_rooms</label>
          <input
            type="text"
            name="total_rooms"
            id="total_rooms"
            placeholder="total_rooms"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name">summary</label>
          <input
            type="text"
            name="summary"
            id="summary"
            placeholder="summary"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name">address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="address"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name">price</label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="price"
            required
          />
          <div className="mb-4">
            <label htmlFor="url_image">Add Photo</label>
            <input
              name="url_image"
              id="url_image"
              placeholder="url_image"
              required
            />
          </div>
        </div>

        <SaveHomeButton />
      </form>
    </div>
  );
}
