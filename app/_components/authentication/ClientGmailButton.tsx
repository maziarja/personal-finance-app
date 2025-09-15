"use client";

import { useFormStatus } from "react-dom";
import { ImSpinner2 } from "react-icons/im";
import { IoLogoGoogle } from "react-icons/io5";

function ClientGmailButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="flex cursor-pointer items-center rounded-full border-1 px-200 py-100"
    >
      {!pending ? (
        <div className="mx-auto flex items-center gap-150">
          <IoLogoGoogle className="fill-grey-900" />
          <p className="text-preset-4-bold text-grey-900">
            Continue with Google
          </p>
        </div>
      ) : (
        <ImSpinner2 className="mx-auto animate-spin text-xl" />
      )}
    </button>
  );
}

export default ClientGmailButton;
