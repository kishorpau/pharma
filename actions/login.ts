"use server";
import * as z from "zod";
import { ShopSchema } from "@/schemas";
export const login = async (values: z.infer<typeof ShopSchema>) => {
  const validatedFields = ShopSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  return {
    success: "Email sent",
  };
};
