"use client";

import { useAuthContext } from "@/app/contexts/auth-context";
import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { postSignIn } from "@/lib/auth-services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useAuthContext();

  async function onSubmit(data) {
    console.log(data);
    const response = await postSignIn(data);
    console.log("Response:", response);

    if (response.status === 200) {
      toast.success(response.message);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      router.push("/products");
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <Heading level={2} className="text-center">
          Sign In
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] focus:border-transparent outline-none transition-all"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="rounded border-gray-300 text-indigo-600 focus:ring-[#1E96FC]"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              href="/auth/forget-password"
              className="text-[#11296B] text-sm hover:text-[#1E96FC] font-semibold"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit">Sign In</Button>
        </form>

        <div className="mt-10 ml-10 mr-10 border-t border-gray-300"></div>

        <div className="mt-2 text-center text-sm text-gray-600 flex justify-center items-center gap-1">
          <p>Don't have an account?</p>
          <span className="text-[#11296B] hover:text-[#1E96FC] font-semibold">
            <Link href="/auth/sign-up">Create an Account</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
