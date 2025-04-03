"use client";

import { useAuthContext } from "@/app/contexts/auth-context";
import Button from "@/components/ui/button";
import { postSignIn } from "@/lib/auth-services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/layout/footer";

function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useAuthContext();

  // Force the navbar to appear in "scrolled" state
  useEffect(() => {
    // Programmatically create a scroll event that the Navbar will detect
    const scrollEvent = new Event("scroll");

    // Set a small timeout to ensure the component is mounted
    const timer = setTimeout(() => {
      // Artificially set the scroll position to trigger the navbar's scrolled state
      window.scrollY = 11; // Just above the 10px threshold in the Navbar

      // Dispatch the event to trigger the navbar's scroll handler
      window.dispatchEvent(scrollEvent);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16">
            {/* Sign In Section */}
            <div className="md:border-r md:border-gray-200 md:pr-16 pb-10 md:pb-0">
              <h2 className="text-2xl mb-2">Sign In</h2>
              <p className="text-sm text-gray-700 mb-8">
                Please sign in to your Empress Account.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full border-b border-gray-300 pb-2 focus:border-gray-900 outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full border-b border-gray-300 pb-2 focus:border-gray-900 outline-none transition-colors"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white px-4 py-3 transition-colors"
                  >
                    Sign In
                  </button>
                </div>

                <div className="mt-4">
                  <Link
                    href="/auth/forget-password"
                    className="text-sm text-gray-700 hover:text-gray-900 hover:underline inline-flex items-center"
                  >
                    Forgot your password?
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </form>
            </div>

            {/* Create Account Section */}
            <div className="mt-10 md:mt-0">
              <h2 className="text-2xl mb-2">Create an Account</h2>
              <p className="text-sm text-gray-700 mb-8">
                Save time during checkout, view your shopping bag and saved
                items from any device and access your order history.
              </p>

              <div className="mt-12">
                <Link href="/auth/sign-up">
                  <button className="w-full bg-black text-white px-4 py-3 transition-colors">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SignIn;
