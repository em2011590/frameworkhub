"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock signup by directly signing in the user. 
    // In our authOptions, any email with '@' works as a demo user.
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent-purple/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px]" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="glass card-hover rounded-2xl p-8 border border-surface-border">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-primary-500 flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Create an Account</h1>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Join the ultimate developer knowledge platform.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-dark/50 border border-surface-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-dark/50 border border-surface-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="you@domain.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Use <code className="text-accent-pink px-1">premium@test.com</code> to simulate a Paid Version account.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-dark/50 border border-surface-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-purple hover:bg-purple-500 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? "Creating account..." : "Sign Up"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-accent-purple hover:text-purple-400 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
