import { auth } from "@/config/auth";
import connectDB from "@/config/database";
import { redirect } from "next/navigation";

async function Page() {
  await connectDB();
  const session = await auth();
  if (!session?.user) redirect("/login");
  redirect("/overview");
}

export default Page;
