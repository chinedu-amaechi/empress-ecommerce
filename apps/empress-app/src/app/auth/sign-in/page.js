// src/app/auth/sign-in/page.js

import Button from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Link from "next/link";
import React from "react";

function SignIn() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <Heading level={2} className="text-center">
          Sign In
        </Heading>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] focus:border-transparent outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E96FC] focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
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
          <Button>Sign In</Button>
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
