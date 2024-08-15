import { ShopSchema } from "@/schemas";
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("Request body:", req.body);

      const parsedData = ShopSchema.parse(req.body);

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

      await sql`
        INSERT INTO shops (name, password, certificate, citizenshipImage, businessImage, latitude, longitude) 
        VALUES (${parsedData.name}, ${parsedData.password}, ${parsedData.certificate}, ${parsedData.citizenshipImage}, ${parsedData.businessImage}, ${parsedData.latitude}, ${parsedData.longitude})
      `;

      res.status(200).json({ message: "Details went successfully" });
    } catch (error) {
      console.error("Error storing shop details:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
