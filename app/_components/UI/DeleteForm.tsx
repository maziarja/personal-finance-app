"use client";

import { ImSpinner6 } from "react-icons/im";

function DeleteForm({
  close,
  isPending,
}: {
  close?: () => void;
  isPending: boolean;
}) {
  return (
    <>
      <button className="text-preset-4-bold bg-red cursor-pointer rounded-lg p-200 text-white">
        {!isPending ? (
          <p className="text-preset-4-bold mx-auto text-white">
            {" "}
            Yes, Confirm Deletion
          </p>
        ) : (
          <ImSpinner6 className="fill-grey-100 mx-auto animate-spin" />
        )}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          close?.();
        }}
        className="text-preset-4 text-grey-500 cursor-pointer rounded-lg p-200"
      >
        No, Go Back
      </button>
    </>
  );
}

export default DeleteForm;
