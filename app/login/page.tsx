import { type Metadata } from "next";
import logoLarge from "@/public/assets/images/logo-large.svg";
import Image from "next/image";
import LoginForm from "../_components/authentication/LoginForm";
import Illustration from "../_components/authentication/Illustration";
import GmailLogin from "../_components/authentication/GmailLogin";
import { auth } from "@/config/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

async function Page() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="bg-beige-100 flex h-dvh flex-col justify-center lg:flex-row">
      <header className="bg-grey-900 mb-auto flex w-full items-center justify-center rounded-b-lg px-500 py-300 lg:hidden">
        <Image src={logoLarge} width={0} height={0} alt="Logo" />
      </header>
      <Illustration />
      <div className="mx-auto mb-auto w-full max-w-140 lg:mt-auto">
        <div className="mx-200 flex flex-col gap-400 rounded-xl bg-white px-250 py-300">
          <LoginForm />
          <GmailLogin />
        </div>
      </div>
    </div>
  );
}

export default Page;
