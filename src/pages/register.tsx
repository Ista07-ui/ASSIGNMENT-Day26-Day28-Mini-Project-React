import Link from "next/link";
import React, { useState } from "react";
import { register } from "@/utils/api";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const data = await register(email, password);
      // Reqres register success returns id and token.
      // We can login immediately or redirect to login.
      // Redirect to Login page for better flow.
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      let errorMessage = "Registration failed.";
      if (err.response) {
          errorMessage += ` Status: ${err.response.status}`;
          if (err.response.data && err.response.data.error) {
              errorMessage = err.response.data.error;
          } else {
             errorMessage += ` ${JSON.stringify(err.response.data)}`;
          }
      } else {
          errorMessage += ` ${err.message}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white transition-colors duration-200 min-h-screen">
      <main className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden mx-auto max-w-md bg-background-light dark:bg-background-dark">
        {/* Header / Nav */}
        <div className="flex items-center p-4 justify-between sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm">
          <Link href="/">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-text-main dark:text-white">
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                arrow_back
              </span>
            </button>
          </Link>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
            Create Account
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col px-6 pb-24">
          {/* Hero Section with Visual Flair */}
          <div className="pt-4 pb-6 flex flex-col items-center text-center">
            <div className="size-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center mb-6 ring-4 ring-white dark:ring-background-dark shadow-xl shadow-primary/10">
              <span
                className="material-symbols-outlined text-primary-dark dark:text-primary"
                style={{ fontSize: "36px" }}
              >
                local_cafe
              </span>
            </div>
            <h1 className="text-[32px] font-bold leading-tight tracking-tight mb-2 text-text-main dark:text-white">
              Join the Team
            </h1>
            <p className="text-text-sub dark:text-gray-400 text-base font-normal leading-relaxed max-w-[280px]">
              Create your POS account to start serving fresh smoothies today.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5 w-full" onSubmit={handleRegister}>
            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </div>
            )}
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main dark:text-gray-200 ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <input
                  className="w-full h-14 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main dark:text-white placeholder:text-text-sub/70 px-5 text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all shadow-sm"
                  placeholder="barista@smoothie.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute right-4 text-primary pointer-events-none flex items-center">
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    mail
                  </span>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main dark:text-gray-200 ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  className="w-full h-14 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main dark:text-white placeholder:text-text-sub/70 pl-5 pr-12 text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all shadow-sm"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="absolute right-0 top-0 bottom-0 px-4 text-text-sub hover:text-primary transition-colors flex items-center justify-center rounded-r-xl"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main dark:text-gray-200 ml-1">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  className="w-full h-14 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main dark:text-white placeholder:text-text-sub/70 pl-5 pr-12 text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all shadow-sm"
                  placeholder="Re-enter your password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  className="absolute right-0 top-0 bottom-0 px-4 text-text-sub hover:text-primary transition-colors flex items-center justify-center rounded-r-xl"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
                    {showConfirmPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 mt-2 px-1">
              <div className="relative flex items-center pt-0.5">
                <input
                  className="peer size-5 appearance-none rounded border border-border-light dark:border-gray-600 bg-surface-light dark:bg-surface-dark checked:bg-primary checked:border-primary transition-all cursor-pointer"
                  id="terms"
                  type="checkbox"
                  required
                />
                <span
                  className="material-symbols-outlined absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  style={{ fontSize: "16px", fontWeight: 800 }}
                >
                  check
                </span>
              </div>
              <label
                className="text-sm text-text-sub dark:text-gray-400 leading-tight cursor-pointer select-none"
                htmlFor="terms"
              >
                I agree to the{" "}
                <Link
                  className="text-text-main dark:text-white font-bold hover:text-primary underline decoration-primary/30 underline-offset-2"
                  href="#"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  className="text-text-main dark:text-white font-bold hover:text-primary underline decoration-primary/30 underline-offset-2"
                  href="#"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
          
            {/* Footer Actions Moved Inside form to control submit */}
            <div className="fixed bottom-0 left-0 right-0 p-5 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-border-light/50 dark:border-border-dark/50 max-w-md mx-auto z-20">
              <button 
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-primary hover:bg-primary-dark active:scale-[0.99] transition-all rounded-xl shadow-[0_8px_20px_-6px_rgba(151,206,74,0.4)] flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                <span className="text-black text-lg font-bold tracking-tight">{loading ? "Registering..." : "Register"}</span>
                {!loading && (
                    <span
                    className="material-symbols-outlined text-black group-hover:translate-x-1 transition-transform"
                    style={{ fontSize: "20px" }}
                    >
                    arrow_forward
                    </span>
                )}
              </button>
              <div className="text-center mt-4">
                <p className="text-text-sub dark:text-gray-500 text-sm font-medium">
                  Already have an account?
                  <Link href="/login">
                    <span className="text-text-main dark:text-white font-bold ml-1 hover:text-primary transition-colors cursor-pointer">
                      Log in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
