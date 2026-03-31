"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Shield, Globe, Search, Rocket } from "lucide-react";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/lib/animations";

const PLANS = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for junior developers starting their journey.",
    features: [
      "Access to 20+ Essential Frameworks",
      "Side-by-Side Comparison Engine",
      "Interactive Roadmap Builder",
      "Public Code Playground",
      "Community Support",
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false,
    color: "gray",
  },
  {
    name: "Pro",
    price: "19",
    description: "The ultimate toolkit for senior engineers and teams.",
    features: [
      "Everything in Free, plus:",
      "AI-Powered Deep Search",
      "Unlimited Saved Frameworks",
      "Custom Learning Paths",
      "Priority API Access",
      "Offline Access to Documentation",
      "Private Code Playground",
    ],
    cta: "Upgrade to Pro",
    href: "/signup?plan=premium",
    popular: true,
    color: "primary",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-24 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary-500/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Elevate Your <span className="gradient-text">Skills</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your growth. Unlock Deep Search and advanced 
            knowledge metrics today.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`glass rounded-3xl p-8 border relative overflow-hidden transition-all duration-300 hover:y-[-4px] ${
                plan.popular 
                  ? "border-primary-500/50 shadow-2xl shadow-primary-500/20" 
                  : "border-surface-border hover:border-gray-500/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                  <Sparkles size={10} /> Recommended
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-white">$</span>
                  <span className="text-6xl font-black text-white leading-tight">{plan.price}</span>
                  <span className="text-gray-500 font-medium">/month</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      plan.popular ? "bg-primary-500/20 text-primary-400" : "bg-white/5 text-gray-500"
                    }`}>
                      <Check size={12} />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-primary-600 hover:bg-primary-500 text-white glow-primary"
                    : "bg-white/5 hover:bg-white/10 text-white border border-surface-border"
                }`}
              >
                {plan.cta}
                <Zap size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature grid breakdown */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-t border-surface-border pt-24"
        >
          <div>
            <div className="w-14 h-14 bg-accent-cyan/10 text-accent-cyan rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search size={28} />
            </div>
            <h4 className="text-white font-bold mb-3 text-lg">Deep Search</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Use our neural engine to find frameworks based on complex requirements, not just names.
            </p>
          </div>
          <div>
            <div className="w-14 h-14 bg-accent-purple/10 text-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield size={28} />
            </div>
            <h4 className="text-white font-bold mb-3 text-lg">Commercial Use</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full licenses for company-wide implementation and team collaboration features.
            </p>
          </div>
          <div>
            <div className="w-14 h-14 bg-primary-500/10 text-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Rocket size={28} />
            </div>
            <h4 className="text-white font-bold mb-3 text-lg">Direct Exports</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Export roadmaps and comparisons directly to Notion, Jira, or CSV for project planning.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
