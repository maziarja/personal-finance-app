"use server";

import { signIn } from "@/config/auth";

export async function googleLogin() {
  await signIn("google", {
    redirectTo: "/",
  });
}
