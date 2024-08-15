// pages/api/saveSelectedUsers.ts
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { selectedUsers } = req.body;

      // Ensure the shops table exists with latitude and longitude
      await sql`
        CREATE TABLE IF NOT EXISTS shops (
          id SERIAL PRIMARY KEY,
          name TEXT,
          password TEXT,
          certificate TEXT,
          citizenshipImage TEXT,
          businessImage TEXT,
          latitude TEXT,
          longitude TEXT
        )
      `;

      // Remove all entries from the shops table
      await sql`DELETE FROM shops`;

      // Insert selected users into the shops table
      await Promise.all(
        selectedUsers.map(
          (user) =>
            sql`
            INSERT INTO shops (id, name, password, certificate, citizenshipImage, businessImage, latitude, longitude) 
            VALUES (${user.id}, ${user.name}, ${user.password}, ${user.certificate}, ${user.citizenshipImage}, ${user.businessImage}, ${user.latitude}, ${user.longitude})
            ON CONFLICT (id) DO UPDATE
            SET name = EXCLUDED.name,
                password = EXCLUDED.password,
                certificate = EXCLUDED.certificate,
                citizenshipImage = EXCLUDED.citizenshipImage,
                businessImage = EXCLUDED.businessImage,
                latitude = EXCLUDED.latitude,
                longitude = EXCLUDED.longitude
          `
        )
      );

      res.status(200).json({ message: "Users updated successfully" });
    } catch (error) {
      console.error("Error saving selected users:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
