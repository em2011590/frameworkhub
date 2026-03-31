"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bookmark, Clock, Map, TrendingUp, Star, ArrowRight, Lock, ShieldAlert, Zap, Key } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { clsx } from "clsx";
import { useSession } from "next-auth/react";

const LEVEL_COLORS = {
  junior: { color: "#10b981", label: "Junior Dev" },
  mid: { color: "#6366f1", label: "Mid-Level Dev" },
  senior: { color: "#8b5cf6", label: "Senior Dev" },
};

const STATIC_RECENT = [
  { slug: "react", name: "React", color: "#61dafb", category: "frontend" },
  { slug: "nextjs", name: "Next.js", color: "#ffffff", category: "fullstack" },
  { slug: "fastapi", name: "FastAPI", color: "#009688", category: "backend" },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const user = useAppSelector((s) => s.user);
  const { saved, recentlyViewed } = useAppSelector((s) => s.dashboard);

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Admin check
  if (session?.user?.email !== "admin@gmail.com") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center mx-auto mb-8 border border-red-500/20 text-red-500">
            <Lock size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Access Restricted</h1>
          <p className="text-gray-400 mb-8">
            The Dashboard is currently reserved for the <span className="text-red-400 font-bold">Admin</span> account. 
            Please sign in with admin credentials to view platform analytics and user insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="px-8 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all shadow-lg shadow-primary-500/20">
              Sign in as Admin
            </Link>
            <Link href="/" className="px-8 py-3 rounded-xl glass border border-surface-border text-gray-300 hover:text-white transition-all">
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const level = LEVEL_COLORS[user.level] ?? LEVEL_COLORS.junior;
  const displayName = session.user?.name ?? "Admin";
  const displayRecent = recentlyViewed.length > 0 ? recentlyViewed.slice(0, 6) : STATIC_RECENT;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-accent-purple/20 text-accent-purple text-[10px] font-black uppercase tracking-widest border border-accent-purple/30">Admin Panel</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, <span className="gradient-text">{displayName}</span>
            </h1>
            <p className="text-gray-400">Manage framework Hub and monitor global platform activity.</p>
          </div>
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-semibold"
            style={{ background: `${level.color}15`, borderColor: `${level.color}40`, color: level.color }}
          >
            <Star size={15} fill="currentColor" />
            {level.label}
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        {[
          { icon: Bookmark, label: "Total Users", value: "1,284", color: "#00d4ff" },
          { icon: Clock, label: "Daily Active", value: "452", color: "#8b5cf6" },
          { icon: Map, label: "Revenue", value: "$4.2k", color: "#10b981" },
          { icon: ShieldAlert, label: "Pending Reviews", value: "12", color: "#f59e0b" },
        ].map(({ icon: Icon, label, value, color }) => (
          <motion.div key={label} variants={fadeUp} className="glass rounded-2xl p-5 border border-surface-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <span className="text-gray-400 text-sm">{label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock size={18} className="text-accent-purple" /> Platform Activity
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {displayRecent.map((fw: any) => (
                <Link key={fw.slug} href={`/frameworks/${fw.slug}`}>
                  <div className="glass rounded-xl p-4 border border-surface-border hover:border-primary-500/40 transition-colors card-hover flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ background: `${fw.color}22`, color: fw.color }}
                    >
                      {fw.name.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-medium text-sm truncate">{fw.name}</div>
                      <div className="text-gray-500 text-xs capitalize">Viewed by testuser@example.com</div>
                    </div>
                    <ArrowRight size={14} className="text-gray-600 ml-auto shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap size={18} className="text-primary-400" /> Pro Management
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/dashboard/api">
                <div className="glass rounded-2xl p-5 border border-primary-500/20 hover:border-primary-500/50 transition-all card-hover group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
                      <Key size={20} />
                    </div>
                    <span className="text-[10px] bg-primary-500/20 text-primary-400 px-2 py-1 rounded font-bold uppercase tracking-wider">Active</span>
                  </div>
                  <h3 className="text-white font-bold mb-1 group-hover:text-primary-300 transition-colors">Priority API Access</h3>
                  <p className="text-xs text-gray-500 mb-4">Manage high-performance API keys and rate limits.</p>
                  <div className="flex items-center gap-2 text-primary-400 text-xs font-bold">
                    Manage Keys <ArrowRight size={14} />
                  </div>
                </div>
              </Link>

              <div className="glass rounded-2xl p-5 border border-surface-border opacity-60">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500">
                    <ShieldAlert size={20} />
                  </div>
                  <span className="text-[10px] bg-white/10 text-gray-500 px-2 py-1 rounded font-bold uppercase tracking-wider">Coming Soon</span>
                </div>
                <h3 className="text-gray-400 font-bold mb-1">User Plan Auditor</h3>
                <p className="text-xs text-gray-600 mb-4">Review and manage individual user subscriptions.</p>
                <div className="flex items-center gap-2 text-gray-600 text-xs font-bold">
                  Locked
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* System Health */}
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-accent-green" /> System Status
            </h2>
            <div className="glass rounded-2xl p-5 border border-surface-border space-y-4">
              {[
                { label: "API Latency", value: "45ms", status: "good" },
                { label: "DB Connection", value: "Healthy", status: "good" },
                { label: "Auth Service", value: "Online", status: "good" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-surface-border">
                  <span className="text-gray-400 font-medium text-sm">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-bold">{stat.value}</span>
                    <div className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_#10b981]" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
