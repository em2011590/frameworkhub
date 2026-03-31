"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, GitCompare, Map, Zap, Star, TrendingUp } from "lucide-react";
import { TypewriterEffect } from "@/components/animations/TypewriterEffect";
import { HeroGlobeWrapper } from "@/components/3d/HeroGlobeWrapper";
import { fadeUp, staggerContainer, fadeIn, floatingVariants } from "@/lib/animations";

const STATS = [
  { label: "Frameworks", value: "35+", icon: Layers },
  { label: "Categories", value: "7", icon: GitCompare },
  { label: "Code Snippets", value: "100+", icon: Zap },
  { label: "Weekly Learners", value: "50K+", icon: TrendingUp },
];

const FEATURED_FRAMEWORKS = [
  { name: "React", color: "#61dafb", cat: "Frontend", stars: "220K" },
  { name: "Next.js", color: "#ffffff", cat: "Fullstack", stars: "125K" },
  { name: "Vue", color: "#42b883", cat: "Frontend", stars: "208K" },
  { name: "FastAPI", color: "#009688", cat: "Backend", stars: "75K" },
  { name: "Svelte", color: "#ff3e00", cat: "Frontend", stars: "79K" },
  { name: "Django", color: "#2ba977", cat: "Backend", stars: "79K" },
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] hero-gradient flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left: text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="z-10"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary-500/15 text-primary-300 border border-primary-500/30 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                The ultimate developer knowledge platform
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Master <br />
              <TypewriterEffect />
              <br />
              <span className="text-gray-400 text-4xl md:text-5xl font-bold">& every framework</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8">
              Explore setup guides, compare performance, build learning roadmaps, and run live code snippets — all in one beautifully crafted platform.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/frameworks"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-purple text-white font-semibold hover:opacity-90 transition-opacity glow-purple"
              >
                Explore Frameworks <ArrowRight size={16} />
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-surface-border text-white font-semibold hover:border-primary-500/50 transition-colors"
              >
                <GitCompare size={16} /> Compare
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: 3D Globe */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="h-[500px] lg:h-[600px] relative w-full"
          >
            <div 
              className="absolute inset-0 rounded-3xl overflow-hidden w-full h-full" 
              style={{ pointerEvents: "auto" }}
            >
              <HeroGlobeWrapper />
            </div>
            {/* Glow decoration */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, transparent 70%)" }}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600"
        >
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-primary-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="border-y border-surface-border bg-surface-card/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ label, value, icon: Icon }) => (
            <motion.div key={label} variants={fadeUp} className="text-center">
              <Icon size={20} className="text-primary-400 mx-auto mb-2" />
              <div className="text-3xl font-black gradient-text">{value}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Featured Frameworks ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Trending <span className="gradient-text">Frameworks</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From reactive frontends to blazing-fast backends — dive deep into any stack.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {FEATURED_FRAMEWORKS.map(({ name, color, cat, stars }) => (
            <motion.div key={name} variants={fadeUp}>
              <Link href={`/frameworks/${name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}>
                <div className="glass rounded-2xl p-4 text-center card-hover border border-surface-border hover:border-primary-500/40 transition-colors group">
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-lg font-bold transition-transform group-hover:scale-110"
                    style={{ background: `${color}22`, border: `1px solid ${color}44`, color }}
                  >
                    {name.slice(0, 2)}
                  </div>
                  <div className="text-white font-semibold text-sm">{name}</div>
                  <div className="text-gray-500 text-xs mt-1">{cat}</div>
                  <div className="text-yellow-400 text-xs mt-2 flex items-center justify-center gap-1">
                    <Star size={10} fill="currentColor" /> {stars}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link
            href="/frameworks"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-surface-border text-gray-300 hover:text-white hover:border-primary-500/50 transition-all"
          >
            View all 35+ frameworks <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: GitCompare,
              color: "#6366f1",
              title: "Side-by-Side Compare",
              desc: "Compare up to 4 frameworks on performance, learning curve, ecosystem strength, and job market demand.",
              href: "/compare",
            },
            {
              icon: Map,
              color: "#8b5cf6",
              title: "Roadmap Builder",
              desc: "Drag and drop frameworks into a personalized learning timeline with estimated completion weeks.",
              href: "/roadmap",
            },
            {
              icon: Zap,
              color: "#00d4ff",
              title: "Live Playground",
              desc: "Run and edit real code snippets directly in the browser with Monaco Editor — zero setup required.",
              href: "/playground",
            },
          ].map(({ icon: Icon, color, title, desc, href }) => (
            <motion.div key={title} variants={fadeUp}>
              <Link href={href}>
                <div className="gradient-border rounded-2xl p-6 card-hover h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  <div className="mt-4 text-sm font-medium flex items-center gap-1" style={{ color }}>
                    Try it out <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
