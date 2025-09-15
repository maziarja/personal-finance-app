"use client";

import { ReactNode } from "react";
import { ImSpinner6 } from "react-icons/im";

function Button({
  onClick,
  children,
  isPending,
}: {
  children: ReactNode;
  onClick?: () => void;
  isPending?: boolean;
}) {
  return (
    <button
      disabled={isPending}
      onClick={onClick}
      className="bg-grey-900 hover:bg-grey-500 flex cursor-pointer gap-200 rounded-lg p-200"
    >
      {!isPending ? (
        <p className="text-preset-4-bold mx-auto text-white">{children}</p>
      ) : (
        <ImSpinner6 className="fill-grey-100 mx-auto animate-spin" />
      )}
    </button>
  );
}

export default Button;
