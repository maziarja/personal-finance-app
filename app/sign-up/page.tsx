import { type Metadata } from "next";
import logoLarge from "@/public/assets/images/logo-large.svg";
import Image from "next/image";
import Illustration from "../_components/authentication/Illustration";
import SignUpForm from "../_components/authentication/SignUpForm";
import { auth } from "@/config/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
};

async function Page() {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <div className="bg-beige-100 flex h-dvh flex-col justify-center lg:flex-row">
      <header className="bg-grey-900 mb-auto flex w-full items-center justify-center rounded-b-lg px-500 py-300 lg:hidden">
        <Image src={logoLarge} width={0} height={0} alt="Logo" />
      </header>
      <Illustration />
      <div className="mx-auto mb-auto w-full max-w-140 lg:mt-auto">
        <SignUpForm />
      </div>
    </div>
  );
}

export default Page;
