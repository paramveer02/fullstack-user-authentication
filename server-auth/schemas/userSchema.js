import z from "zod";

const name = z.string().trim().min(1, "Required").max(60, "Too Long");

export const userCreateSchema = z.object({
  firstName: name,
  lastName: name,
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"),
  role: z.enum(["user", "admin"]).optional(),
});
