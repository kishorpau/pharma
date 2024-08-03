import { uuid, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const shop = pgTable("shop", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  certificate: text("certificate"),
  citizenshipImage: text("citizenship_image"),
  businessImage: text("business_image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
