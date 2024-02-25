import { User } from "@prisma/client";
import { prismaClient } from "@/shared/lib/db-client";

export async function fetchUsers(): Promise<User[]> {
  // Function to fetch all posts from the database.
  return await prismaClient.user.findMany();
}
