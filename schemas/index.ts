import * as z from "zod";

export const ShopSchema = z.object({
  name: z.string().min(1, {
    message: "must contain 1 letter",
  }),
  password: z.string().min(8, {
    message: "At least 8 characters is required",
  }),
  certificate: z.string().optional(),
  citizenshipImage: z.string().optional(),
  businessImage: z.string().optional(),
  latitude: z.string().min(1, {
    message: "Latitude is required",
  }),
  longitude: z.string().min(1, {
    message: "Longitude is required",
  }),
});
