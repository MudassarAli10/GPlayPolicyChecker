import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Eye, EyeOff } from "lucide-react";
import ForgotPassword from "@/components/forget";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 py-20 mt-7">
        <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
          <p className="text-center text-gray-400 mb-8">
            Sign in to your PlayPolicyChecker account
          </p>

          <form className="space-y-5">
            <div>
              <Label htmlFor="email" className="block mb-2 text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-gray-900 text-white border-gray-700 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block mb-2 text-sm">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-gray-900 text-white border-gray-700 focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="/forget" className="hover:underline text-blue-400">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Register Now
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
