import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "reqres_78a869f591654962800d3a55978d5b34",
    };
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginToken", data.token);
        localStorage.setItem("userData", JSON.stringify(payload));

        const { toast } = await import("react-toastify");
        toast.success("Berhasil Login");

        setTimeout(() => {
          router.push("/users/2");
        }, 2000);
      } else {
        const errorMsg = data.error || "Gagal Login";
        setError(errorMsg);
        const { toast } = await import("react-toastify");
        toast.error(errorMsg);
      }
    } catch (err: any) {
      console.error(err);
      const message = "Login failed. Please check your credentials.";
      setError(message);
      const { toast } = await import("react-toastify");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Cakes & Smoothies</title>
        <meta name="description" content="Login to your account" />
      </Head>
      <div className="bg-background-light dark:bg-background-dark font-display text-[#111811] dark:text-white antialiased overflow-hidden group/design-root min-h-[100dvh]">
        <ToastContainer position="top-right" autoClose={2000} />
        <main className="relative flex flex-col h-[calc(100vh-theme(spacing.12))] w-full max-w-md mx-auto bg-background-light dark:bg-background-dark overflow-hidden">
          {/* Background Decor elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[30%] bg-primary/5 rounded-full blur-[60px] pointer-events-none"></div>

          {/* Scrollable Content Area */}
          <div className="flex-1 flex flex-col w-full overflow-y-auto no-scrollbar relative z-10 px-6">
            {/* Spacer for top area */}
            <div className="h-12 w-full shrink-0"></div>

            {/* Header Section */}
            <div className="flex flex-col items-center pt-8 pb-8">
              <div className="mb-6">
              <div className="mb-6">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={128}
                  height={128}
                  className="w-32 h-auto"
                  priority
                />
              </div>
              </div>
              <h1 className="text-[#111811] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center">
                Welcome Back!
              </h1>
              <p className="text-[#111811]/60 dark:text-white/60 text-base font-normal leading-normal pt-2 text-center">
                Let&apos;s get brewing.
              </p>
            </div>

            {/* Login Form */}
            <form className="w-full space-y-5" onSubmit={handleLogin}>
              {/* Credential Hint */}
              <div className="p-3 text-sm text-blue-800 bg-blue-100 rounded-lg dark:bg-blue-900/30 dark:text-blue-300">
                <p className="font-bold">Demo Credentials:</p>
                <p>Email: eve.holt@reqres.in</p>
                <p>Password: cityslicka (or any)</p>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </div>
              )}
              {/* Email Field */}
              <div className="group/input">
                <label className="block text-sm font-medium text-[#111811] dark:text-white mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-focus-within/input:text-primary transition-colors">
                      mail
                    </span>
                  </div>
                  <input
                    className="block w-full h-14 pl-11 pr-4 rounded-full border border-[#dbe6db] dark:border-white/10 bg-white dark:bg-white/5 text-[#111811] dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base"
                    placeholder="eve.holt@reqres.in"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group/input">
                <label className="block text-sm font-medium text-[#111811] dark:text-white mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-focus-within/input:text-primary transition-colors">
                      lock
                    </span>
                  </div>
                  <input
                    className="block w-full h-14 pl-11 pr-12 rounded-full border border-[#dbe6db] dark:border-white/10 bg-white dark:bg-white/5 text-[#111811] dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base"
                    placeholder="cityslicka"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#111811] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                <div className="flex justify-end pt-2">
                  <a
                    className="text-sm font-medium text-[#111811]/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-colors"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-primary hover:brightness-105 active:brightness-95 text-[#102210] text-lg font-bold rounded-full shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center cursor-pointer disabled:opacity-70"
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
                <div className="flex flex-col items-center gap-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Or login with
                  </span>
                  <button
                    type="button"
                    className="w-14 h-14 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-3xl text-[#111811] dark:text-white">
                      face
                    </span>
                  </button>
                </div>
              </div>

              {/* Spacer */}
              <div className="h-8"></div>
            </form>

            {/* Footer Area */}
            <div className="mt-auto pb-8 pt-4 border-t border-gray-100 dark:border-white/5">
              <p className="text-center text-[#111811] dark:text-white text-base">
                New to the team?
                <Link
                  className="font-bold text-primary hover:underline ml-1"
                  href="/register"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
