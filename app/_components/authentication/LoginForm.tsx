"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { PiEyeFill } from "react-icons/pi";
import { PiEyeSlashFill } from "react-icons/pi";
import { MdErrorOutline } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  function handleSubmitLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      if (res.error) {
        setError("Invalid email or password");
      } else {
        setError("");
        router.push("/");
      }
    });
  }
  return (
    <form onSubmit={handleSubmitLogin} className="flex flex-col gap-400">
      <p className="text-preset-1 text-grey-900">Login</p>
      <div className="flex flex-col gap-200">
        <div className="flex flex-col gap-50">
          <label className="text-preset-5-bold text-grey-500" htmlFor="email">
            Email
          </label>
          <input
            required
            name="email"
            className={`${error ? "ring-red" : "ring-beige-500"} rounded-lg bg-white px-250 py-150 ring-1`}
            id="email"
            type="email"
          />
          {error && (
            <div className="flex items-center gap-50">
              <MdErrorOutline className="fill-red" />
              <p className="text-preset-5 text-red">{error}</p>
            </div>
          )}
        </div>
        <div className="relative flex flex-col gap-50">
          <label
            className="text-preset-5-bold text-grey-500"
            htmlFor="password"
          >
            Password
          </label>
          <input
            required
            name="password"
            id="password"
            className={`${error ? "ring-red" : "ring-beige-500"} rounded-lg bg-white px-250 py-150 ring-1`}
            type={showPassword ? "text" : "password"}
          />
          {error && (
            <div className="flex items-center gap-50">
              <MdErrorOutline className="fill-red" />
              <p className="text-preset-5 text-red">{error}</p>
            </div>
          )}
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
      </div>
      <button
        disabled={isPending}
        className="bg-grey-900 text-preset-4-bold cursor-pointer rounded-lg p-200 text-white"
      >
        {!isPending ? (
          "Login"
        ) : (
          <ImSpinner2 className="mx-auto animate-spin text-xl" />
        )}
      </button>
      <p className="text-preset-4 text-grey-500 mx-auto">
        Need to create an account?{" "}
        <Link
          className="text-preset-4-bold text-grey-900 ml-50 cursor-pointer underline"
          href="/sign-up"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
