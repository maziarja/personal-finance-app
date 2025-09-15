"use server";

import { signOut } from "@/config/auth";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
