/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerCompany } from "@/app/api/services/signup";
import { nameRegex, emailRegex, passwordRegex } from "@/utils/regex";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordField from "../ui/password-fields";
import TextField from "../ui/input-fields";
import { useRouter } from "next/navigation";

const SignUpMain = () => {

  //useRouter
  const router = useRouter();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password for confirm password validation
  const password = watch("password");

  // OnSubmit function for handling form submission
  const onSubmit = async (formData: any) => {
    // Prepare API payload
    const payload = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
    };

    try {
      const response = await registerCompany(payload);

      if (response.status === 201) {
        setTimeout(() => {
          toast.success("Registration Successful!", {
            className: "text-blue-600",
          });
        }, 2000)
        router.push("/signin");

      } else if (response.status === 400) {
        if (
          response.message.includes("E11000 duplicate key error") &&
          response.message.includes("index: name_1")
        ) {
          toast.error("Company name already exists.", {
            className: "text-blue-600",
          });
        } else {
          toast.error(response.message || "Registration failed. Please try again.", {
            className: "text-blue-600",
          });
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.", {
          className: "text-blue-600",
        });
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error(error.message, {
        className: "text-blue-600",
      });
    }
  };

  return (
    <section
      style={{ backgroundImage: `url('/image/background-image.png')` }}
      className="min-h-screen"
    >
      <section className="min-h-screen font-sans grid place-items-center px-2.5 lg:px-0">
        <div className="bg-white py-10 px-5 lg:w-6/12 lg:px-10 rounded-md">
          <section className="flex flex-col items-center mb-16">
            <figure className="mb-5">
              <Image src={"/image/logo.png"} width={100} height={100} alt="Logo" />
            </figure>
            <h3 className="text-[#001652] text-2xl font-bold mb-2">
              See how Cynegie works
            </h3>
            <p className="font-medium text-base text-[#98A2B3]">
              Book a 30-minute demo to see how Cynegie works
            </p>
          </section>

       <form className="lg:grid lg:grid-cols-2 gap-5" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="First Name"
            placeholder="Enter your first name"
            error={errors.firstName?.message}
            register={register("firstName", {
              required: "First name is required",
              pattern: { value: nameRegex, message: "First name must contain only alphabets" },
            })}
          />

          <TextField
            label="Last Name"
            placeholder="Enter your last name"
            error={errors.lastName?.message}
            register={register("lastName", {
              required: "Last name is required",
              pattern: { value: nameRegex, message: "Last name must contain only alphabets" },
            })}
          />

          <TextField
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            register={register("email", {
              required: "Email is required",
              pattern: { value: emailRegex, message: "Please enter a valid email" },
            })}
          />

          <TextField
            label="Company Name"
            placeholder="Enter your company name"
            error={errors.companyName?.message}
            register={register("companyName", { required: "Company name is required" })}
          />

          <PasswordField
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            register={register("password", {
              required: "Password is required",
              pattern: {
                value: passwordRegex,
                message:
                  "Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character",
              },
            })}
          />

          <PasswordField
            label="Confirm Password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            register={register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) => value === password || "Passwords do not match",
            })}
          />

          <div className="mx-auto col-span-2 place-items-center">
            <button
              className="bg-[#0035C3] lg:px-48 py-2 rounded-md text-white font-semibold w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

          <p className="text-sm text-center mt-5 text-[#98A2B3] leading-relaxed">
            By clicking &quot;Sign up&quot; you agree to Cynegie&apos;s{" "}
            <Link href="/" className="text-[#0035C3] underline">
              User Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/" className="text-[#0035C3] underline">
              Privacy Notice
            </Link>.
          </p>
        </div>
      </section>
    </section>
  );
};

export default SignUpMain;
