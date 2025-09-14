import z from "zod";

const name = z.string().trim().min(1, "Required").max(60, "Too Long");

export const userCreateSchema = z.object({
  firstName: name,
  lastName: name,
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["user", "admin"]).optional(),
});
