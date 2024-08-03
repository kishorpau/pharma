// pages/api/users/[userId].js
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  const {
    query: { userId },
  } = req;

  if (req.method === "GET") {
    try {
      const user = await sql`SELECT * FROM shops WHERE id = ${userId}`;
      if (user.length > 0) {
        res.status(200).json(user[0]);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
