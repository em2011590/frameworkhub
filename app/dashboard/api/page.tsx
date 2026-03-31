"use client";

import { motion } from "framer-motion";
import { Key, Copy, Check, ShieldCheck, Zap, Globe, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fadeUp } from "@/lib/animations";

export default function APIDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const isPro = session?.user?.plan === "premium" || session?.user?.role === "admin";

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Key className="text-primary-400" /> Priority API Access
        </h1>
        <p className="text-gray-400">Manage your high-performance API keys for framework data integration.</p>
      </motion.div>

      {!isPro ? (
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          animate="visible"
          className="glass rounded-3xl p-12 border border-primary-500/20 text-center"
        >
          <div className="w-20 h-20 bg-primary-500/10 text-primary-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Pro Feature Only</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Upgrade to the Pro plan to unlock high-priority API access with 99.9% uptime and 10k requests/min limits.
          </p>
          <button className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-8 rounded-2xl transition-all glow-primary">
            View Pricing Plans
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass rounded-2xl p-6 border border-surface-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Production Key <ShieldCheck size={18} className="text-accent-green" />
                </h3>
                <p className="text-sm text-gray-500">Active • 10,000 req/min</p>
              </div>
              <span className="text-[10px] bg-accent-green/20 text-accent-green px-2 py-1 rounded font-bold uppercase tracking-wider">Active</span>
            </div>
            
            <div className="relative">
              <input 
                type="password" 
                readOnly 
                value="fh_live_8kmn2983ns091kmd9283js89" 
                className="w-full bg-black/40 border border-surface-border rounded-xl py-3 px-4 text-gray-300 font-mono text-sm focus:outline-none"
              />
              <button 
                onClick={() => copyToClipboard("fh_live_8kmn2983ns091kmd9283js89", "live")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                title="Copy Key"
              >
                {copiedKey === "live" ? <Check size={16} className="text-accent-green" /> : <Copy size={16} className="text-gray-500" />}
              </button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="glass rounded-2xl p-6 border border-surface-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Development Key <Zap size={18} className="text-accent-cyan" />
                </h3>
                <p className="text-sm text-gray-500">Active • 1,000 req/min</p>
              </div>
              <span className="text-[10px] bg-accent-cyan/20 text-accent-cyan px-2 py-1 rounded font-bold uppercase tracking-wider">Sandbox</span>
            </div>
            
            <div className="relative">
              <input 
                type="password" 
                readOnly 
                value="fh_test_k928js89skm2983ns091km" 
                className="w-full bg-black/40 border border-surface-border rounded-xl py-3 px-4 text-gray-300 font-mono text-sm focus:outline-none"
              />
              <button 
                onClick={() => copyToClipboard("fh_test_k928js89skm2983ns091km", "test")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-lg transition-colors"
                title="Copy Key"
              >
                {copiedKey === "test" ? <Check size={16} className="text-accent-green" /> : <Copy size={16} className="text-gray-500" />}
              </button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="p-6 rounded-2xl border border-primary-500/20 bg-primary-500/5">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <Globe size={16} className="text-primary-400" /> API Documentation
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Integrated with GraphQL and REST protocols. Use your priority keys in the header to bypass global rate limiting.
            </p>
            <button className="text-primary-400 text-sm font-bold hover:underline">
              Read API Docs →
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
