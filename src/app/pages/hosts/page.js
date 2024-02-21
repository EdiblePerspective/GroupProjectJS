
import { clerkClient } from '@clerk/nextjs';
import { db } from "@/db";
import { useUser } from "@clerk/nextjs";
export default async function HostUser() {
  const hostId = await db.query(`SELECT id FROM users_hosts WHERE clecks_user_id = ${user.id} `);
  const hostRooms = await db.query(`SELECT * FROM rooms WHERE owner_id = ${hostId}`); //update with sql
  const { isSignedIn, user, isLoaded } = useUser();
 {user.id}//clerk user id
  if (!isLoaded) {
    return null;
  }
 
  if (isSignedIn) {
    return <div>
      <p>Hello {user.fullName}!</p>
      <div></div>
      </div>

      
  }
 
  return <div>Not signed in</div>;
}
//list of products
//add/remove product
//if no product display add hosted house add host info to database