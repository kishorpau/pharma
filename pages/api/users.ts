// pages/api/users.ts
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await sql`SELECT * FROM shops`;
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
