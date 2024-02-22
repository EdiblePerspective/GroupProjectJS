import { auth } from "@clerk/nextjs";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SaveProfileButton from "@/components/SaveProfileButton";
export default function CreateProfile() {
  const { userId } = auth();

  async function addNewProfile(formData) {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const phone_number = formData.get("phone_number");
    const description = formData.get("description");
    const profile_image = formData.get("profile_image");
    console.log("userid", userId);
    await db.query(
      `INSERT INTO users_hosts (clecks_user_id, name, email, phone_number, description, profile_image) VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, name, email, phone_number, description, profile_image]
    );

    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <h2>Create Profile</h2>
      <form action={addNewProfile}>
        <input name="name" placeholder="name" />
        <textarea name="email" placeholder="email"></textarea>
        <textarea name="phone_number" placeholder="phone_number"></textarea>
        <textarea name="description" placeholder="description"></textarea>
        <textarea name="profile_image" placeholder="profile_image"></textarea>
        <SaveProfileButton />
      </form>
    </div>
  );
}
