"use client";

import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Login() {
  const { loginWithGoogle, loginWithFacebook, loginWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await loginWithEmail(email, password);
      // Handle successful login (e.g., redirect)
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      await loginWithGoogle();
      // Handle successful login
    } catch (err) {
      setError("Failed to login with Google.");
      console.error(err);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setError(null);
      await loginWithFacebook();
      // Handle successful login
    } catch (err) {
      setError("Failed to login with Facebook.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl min-h-[600px] rounded-lg flex">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-12">
          <h1 className="text-3xl font-bold mb-4">Log In to Your Brand</h1>
          <p className="text-neutral-600 mb-8">
            Log in to get personalized content recommendations, destinations and events you love and quick booking
          </p>

          {/* Social Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-neutral-200 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Image
                src="/assets/google-icon.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span>Log in with Google</span>
            </button>

            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center gap-3 border border-neutral-200 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Image
                src="/assets/facebook-icon.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
              <span>Log in with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-neutral-500">Or</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailLogin}>
            {error && (
              <div className="mb-4 text-red-500 text-sm">
                {error}
              </div>
            )}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white p-3 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              Login
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center mt-8">
            Not a member?{" "}
            <button className="text-neutral-900 font-medium hover:underline">
              Sign up now
            </button>
          </p>
        </div>

        {/* Right Side - Image and Luna Program */}
        <div className="w-1/2 bg-neutral-50 p-12 rounded-r-lg">
          <div className="mb-12">
            <Image
              src="/imgs/sign-in.png"
              alt="Login illustration"
              width={400}
              height={300}
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
              <h2 className="text-xl font-bold">
                <strong>Meet Luna Nueva</strong> our new loyalty program
              </h2>
            </div>

            <p className="text-neutral-600">
              Sign up to Your Brand and start benefit from our Luna Nueva membership
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Complimentary Welcome Drink",
                "Members Rates @ Brand Retail Shops",
                "Authentic Local Experiences",
                "Access to Global Book Exchange",
                "Free Wellness Activity",
                "Earn Tokens via Volunteering Activities",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button className="absolute top-4 right-4 p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
