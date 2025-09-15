"use client";

import { signUp } from "@/app/_actions/auth/signUp";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { ImSpinner2 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmitSignUp(e: FormEvent<HTMLFormElement>) {
    startTransition(async () => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const result = await signUp(formData);

      if (result.error) {
        setError(result.error);
      } else {
        setError("");
      }

      if (result.success) {
        signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          name: formData.get("name"),
        });
      }
    });
  }
  return (
    <form
      onSubmit={handleSubmitSignUp}
      className="mx-200 flex flex-col gap-400 rounded-xl bg-white px-250 py-300"
    >
      <p className="text-preset-1 text-grey-900">Sign Up</p>
      <div className="flex flex-col gap-200">
        <div className="flex flex-col gap-50">
          <label className="text-preset-5-bold text-grey-500" htmlFor="name">
            Name
          </label>
          <input
            required
            name="name"
            id="name"
            className="ring-beige-500 rounded-lg bg-white px-250 py-150 ring-1"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-50">
          <label className="text-preset-5-bold text-grey-500" htmlFor="email">
            Email
          </label>
          <input
            required
            name="email"
            id="email"
            className="ring-beige-500 rounded-lg bg-white px-250 py-150 ring-1"
            type="email"
          />
        </div>
        <div className="relative flex flex-col gap-50">
          <label
            className="text-preset-5-bold text-grey-500"
            htmlFor="password"
          >
            Create Password
          </label>
          <input
            required
            name="password"
            minLength={8}
            id="password"
            className="ring-beige-500 rounded-lg bg-white px-250 py-150 ring-1"
            type={showPassword ? "text" : "password"}
          />
          <p className="text-preset-5 text-grey-500 ml-auto">
            Passwords must be at least 8 characters
          </p>

          <div
            role="button"
            className="cursor-pointer"
            onClick={() => setShowPassword((show) => !show)}
          >
            {showPassword ? (
              <PiEyeSlashFill className="absolute top-9.5 right-4 text-lg" />
            ) : (
              <PiEyeFill className="absolute top-9.5 right-4 text-lg" />
            )}
          </div>
        </div>
        {error && (
          <div className="flex items-center gap-50">
            <MdErrorOutline className="fill-red" />
            <p className="text-preset-5 text-red">{error}</p>
          </div>
        )}
      </div>

      <button
        disabled={isPending}
        className="bg-grey-900 text-preset-4-bold cursor-pointer rounded-lg p-200 text-white"
      >
        {!isPending ? (
          "Create Account"
        ) : (
          <ImSpinner2 className="mx-auto animate-spin text-xl" />
        )}
      </button>

      <p className="text-preset-4 text-grey-500 mx-auto">
        Already have an account?{" "}
        <Link
          className="text-preset-4-bold text-grey-900 ml-50 cursor-pointer underline"
          href="/login"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default SignUpForm;
