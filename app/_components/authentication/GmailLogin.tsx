import { googleLogin } from "@/app/_actions/auth/googleLogin";
import ClientGmailButton from "./ClientGmailButton";

function GmailLogin() {
  return (
    <form action={googleLogin} className="flex flex-col gap-200">
      <div className="flex items-center">
        <div className="border-grey-100 w-1/2 border-b-2"></div>
        <p className="text-preset-4 text-grey-500 mx-200">Or</p>
        <div className="border-grey-100 w-1/2 border-b-1"></div>
      </div>
      <ClientGmailButton />
    </form>
  );
}

export default GmailLogin;
