import { neon } from "@neondatabase/serverless";
import { ShopSchema } from "@/schemas"; // Adjust the path as necessary

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Log incoming request body
      console.log("Request body:", req.body);

      // Validate and parse request body
      const parsedData = ShopSchema.parse(req.body);

      // Create table if not exists (usually done during initial setup, not each request)
      await sql`
        CREATE TABLE IF NOT EXISTS shops (
          id SERIAL PRIMARY KEY,
          name TEXT,
          password TEXT,
          location TEXT,
           phoneNumber TEXT,
          certificate TEXT,
          citizenshipImage TEXT,
          businessImage TEXT
        )
      `;

      // Insert shop details into database
      await sql`
        INSERT INTO shops (name, password, certificate, citizenshipImage, businessImage) 
        VALUES (${parsedData.name}, ${parsedData.password}, ${parsedData.certificate}, ${parsedData.citizenshipImage}, ${parsedData.businessImage})
      `;

      res.status(200).json({ message: "Details went successfully" });
    } catch (error) {
      // Log detailed error
      console.error("Error storing shop details:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
