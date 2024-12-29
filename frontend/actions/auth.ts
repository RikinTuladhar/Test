"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import { resolveSoa } from "dns";

const testUser = {
  id: "1",
  username: "admin@gmail.com",
  password: "12345678",
};

const loginSchema = z.object({
  username: z
    .string({ message: "Invalid username" })
    .min(3, { message: "Username must be at least 8 characters" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function signin(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  console.log(result)

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { username, password } = result.data;
  console.log(result.data)

  if (username !== testUser.username || password !== testUser.password) {
    return {
      errors: {
        username: ["Invalid username or password"],
      },
    };
  }

  await createSession(testUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
