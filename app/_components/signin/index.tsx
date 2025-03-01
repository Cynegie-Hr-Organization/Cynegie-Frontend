"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { getSession, signIn } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppButton from "../shared/button";
import { getRedirectPath } from "@/utils";

const SigninMain = () => {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { ref: emailRef, inView: emailInView } = useInView({
    triggerOnce: true,
  });
  const { ref: passwordRef, inView: passwordInView } = useInView({
    triggerOnce: true,
  });

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setStep("password");
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting signIn with credentials:", { email, password });
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log("SignIn response:", res);

      if (res?.ok) {
        const user = await getSession();
        console.log("User session data:", user);

        // Normalize roles to lowercase before passing to getRedirectPath
        const roles = (user?.user?.role || []).map((role) =>
          role.toLowerCase(),
        );
        const redirectPath = getRedirectPath(roles);
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          toast.error("User role not found. Please contact support.", {
            className: "text-blue-600",
          });
        }
      } else if (res?.error) {
        // Handle specific error messages
        if (res.error === "CredentialsSignin") {
          toast.error("Invalid login credentials. Please try again.", {
            className: "text-blue-600",
          });
        } else {
          toast.error(
            "Login failed due to a server issue. Please try again later.",
            { className: "text-blue-600" },
          );
        }
      } else {
        toast.error("Login failed. Please try again.", {
          className: "text-blue-600",
        });
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);

      // Detect network errors
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        toast.error(
          "Network error. Please check your connection and try again.",
          {
            className: "text-blue-600",
          },
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          className: "text-blue-600",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={"min-h-screen"}
      style={{ backgroundImage: `url('/image/background-image.png')` }}
    >
      <section className="min-h-screen font-sans grid place-items-center px-4">
        <div className="bg-white py-10 px-5 lg:w-6/12 lg:px-10 rounded-md shadow-md">
          {/* Header */}
          <div className="flex flex-col items-center mb-8 md:mb-16">
            <img
              src="/image/logo.png"
              alt="Logo"
              className="mb-1 md:mb-5 w-32"
            />
            <h2 className="text-[#001652] text-2xl font-bold mb-2">
              Welcome back!
            </h2>
            <p className="font-medium text-center text-base text-[#98A2B3]">
              Sign in to continue managing your employee.
            </p>
          </div>

          {/* Email Input */}
          {step === "email" && (
            <form
              onSubmit={handleEmailSubmit}
              ref={emailRef}
              className={`transition-opacity duration-500 ${
                emailInView ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="mb-8">
                <label className="mb-2 block text-sm text-gray-700">
                  Email Address
                </label>
                <div className="flex items-center border-2 rounded-md px-2 py-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-none px-2 py-2 rounded-md placeholder:text-sm focus:outline-none"
                  />
                </div>
              </div>
              <AppButton
                type="submit"
                label="Continue"
                className="btn-primary md:w-full"
                isLoading={isLoading}
                disabled={isLoading || email.length < 3}
              />
            </form>
          )}

          {/* Password Input */}
          {step === "password" && (
            <form
              onSubmit={handlePasswordSubmit}
              ref={passwordRef}
              className={`transition-opacity duration-500 ${
                passwordInView ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Display email */}
              <div className="flex items-center justify-center gap-2 p-2 md:p-3 md:px-5 mx-auto rounded-full max-w-fit ring-1 ring-gray-300 mb-8">
                <FaRegUser size={24} />
                <span>{email}</span>
              </div>

              {/* Password Field */}
              <div className="mb-4 md:mb-8">
                <label className="mb-2 block text-sm text-gray-700">
                  Password
                </label>
                <div className="flex items-center border-2 rounded-md px-2 py-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-none px-2 py-2 rounded-md placeholder:text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 focus:outline-none"
                  >
                    {showPassword ? (
                      <VscEye size={20} />
                    ) : (
                      <VscEyeClosed size={20} />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <a href="/reset-password" className="text-blue-600 text-sm">
                    Reset Password
                  </a>
                </div>
              </div>

              <AppButton
                label={isLoading ? "Signing In..." : "Sign In"}
                type="submit"
                className="btn-primary md:w-full"
                isLoading={isLoading}
                disabled={isLoading || email.length < 3 || password.length < 3}
              />

              {/* Go Back Button */}
              <div className="flex w-full items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setPassword("");
                  }}
                  className="mt-4 text-xs md:text-sm text-black-600 hover:underline"
                >
                  Go Back to Change Email
                </button>
              </div>
            </form>
          )}
          <p className="text-xs md:text-sm text-center mt-5 text-[#98A2B3] leading-relaxed">
            By clicking &quot;Continue&quot; you agree to Cynegie&apos;s{" "}
            <Link href="/" className="text-[#0035C3] underline">
              User Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/" className="text-[#0035C3] underline">
              Privacy Notice
            </Link>
            .
          </p>
        </div>
      </section>
    </section>
  );
};

export default SigninMain;
