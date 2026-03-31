"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg glass border border-surface-border rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="relative p-8 pb-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-purple to-primary-500 flex items-center justify-center mb-6 glow-purple">
              <Sparkles className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold mb-3">Upgrade to Premium</h2>
            <p className="text-gray-400">
              Unlock the full power of FrameworkHub with deep search and advanced analytics.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="p-8">
            <div className="bg-gradient-to-br from-primary-500/20 to-accent-purple/20 border border-primary-500/30 rounded-2xl p-6 mb-8">
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-gray-400 pb-1">/month</span>
              </div>

              <ul className="space-y-3 mb-0">
                {[
                  "Unlimited Deep Search",
                  "AI-Powered Framework Comparisons",
                  "Advanced Roadmap Generation",
                  "Exclusive Setup Templates",
                  "Priority Support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-accent-green/20 flex items-center justify-center text-accent-green">
                      <Check size={12} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <button
                className="w-full bg-gradient-to-r from-primary-600 to-accent-purple hover:from-primary-500 hover:to-accent-purple/80 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2"
              >
                Get Premium Access
                <ArrowRight size={18} />
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors"
              >
                Continue with limited access
              </button>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
