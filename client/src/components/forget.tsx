import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Login from "@/components/login";

const ForgotPassword = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 py-20 mt-14">
        <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Forgot Your Password?
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <form className="space-y-6">
            <div>
              <Label htmlFor="email" className="block mb-2 text-sm">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-gray-900 text-white border-gray-700 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl"
            >
              Send Reset Link
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Remember your password?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
