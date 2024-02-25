import { User } from "@prisma/client";
import { db } from "@/shared/lib/db-client";

export async function fetchUsers(): Promise<User[]> {
  // Function to fetch all posts from the database.
  return await db.user.findMany();
}
