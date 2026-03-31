"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Download, ExternalLink, Globe, CheckCircle2, XCircle,
  BookOpen, Code2, Layers, ChevronDown, Copy, Check, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { addRecentlyViewed } from "@/lib/redux/slices/dashboardSlice";
import { addToCompare } from "@/lib/redux/slices/compareSlice";
import { saveFramework, unsaveFramework } from "@/lib/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useProgressStore } from "@/lib/zustand/useProgressStore";
import { clsx } from "clsx";
import { fadeUp, tabSlide, staggerContainer } from "@/lib/animations";

type Tab = "overview" | "setup" | "snippets" | "pros-cons";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
      {copied ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
    </button>
  );
}

import { STATIC_FRAMEWORKS } from "@/lib/data/staticFrameworks";

export default function FrameworkDetailPage() {
  const params = useParams<{ slug: string }>();
  const [framework, setFramework] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [openStep, setOpenStep] = useState<number | null>(0);

  const dispatch = useAppDispatch();
  const savedFrameworks = useAppSelector((s) => s.user.savedFrameworks);
  const isSaved = framework ? savedFrameworks.includes(framework.slug) : false;

  const { completeStep, uncompleteStep, completedSteps } = useProgressStore();

  useEffect(() => {
    async function fetchFramework() {
      setLoading(true);
      try {
        const controller = new AbortController();
        // Set timeout to 8 seconds (longer than API timeout to avoid early abort)
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const res = await fetch(`/api/frameworks/${params.slug}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setFramework(data);
        dispatch(addRecentlyViewed({ id: data._id || data.id, name: data.name, slug: data.slug, category: data.category, logo: data.logo, color: data.color, description: data.description, level: data.level, tags: data.tags, language: data.language, stars: data.stars, weeklyDownloads: data.weeklyDownloads, performance: data.performance, learningCurve: data.learningCurve, ecosystem: data.ecosystem, jobMarket: data.jobMarket }));
      } catch (error) {
        // Use static fallback if DB fails or timeout (silently for abort)
        const fallback = STATIC_FRAMEWORKS.find(f => f.slug === params.slug);
        if (fallback) {
          setFramework(fallback);
          dispatch(addRecentlyViewed(fallback));
        } else {
          setFramework(null);
        }
      }
      setLoading(false);
    }
    if (params.slug) fetchFramework();
  }, [params.slug, dispatch]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
        <div className="h-10 bg-white/5 rounded-xl w-64 mb-4" />
        <div className="h-5 bg-white/5 rounded-xl w-full max-w-2xl mb-2" />
        <div className="h-5 bg-white/5 rounded-xl w-3/4 max-w-xl" />
      </div>
    );
  }

  if (!framework) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-white mb-2">Framework not found</h1>
        <p className="text-gray-400 mb-6">This framework doesn&apos;t exist in the database yet.</p>
        <Link href="/frameworks" className="text-primary-400 hover:text-primary-300 flex items-center justify-center gap-2">
          <ArrowRight size={16} /> Back to frameworks
        </Link>
      </div>
    );
  }

  const TABS: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "setup", label: "Setup Guide", icon: BookOpen },
    { id: "snippets", label: "Code Snippets", icon: Code2 },
    { id: "pros-cons", label: "Pros & Cons", icon: Star },
  ];

  const steps: any[] = framework.setupSteps ?? [];
  const slugSteps = completedSteps[framework.slug];
  const completedCount = slugSteps ? slugSteps.size : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-xl"
              style={{ background: `${framework.color}22`, border: `2px solid ${framework.color}55`, color: framework.color }}
            >
              {framework.name.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-black text-white">{framework.name}</h1>
                <span className={`badge-${framework.category} text-xs px-2.5 py-1 rounded-full font-medium`}>
                  {framework.category}
                </span>
              </div>
              <p className="text-gray-400 text-sm max-w-lg">{framework.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400" /> {(framework.stars / 1000).toFixed(0)}K stars</span>
                <span className="flex items-center gap-1"><Download size={12} className="text-accent-cyan" /> {(framework.weeklyDownloads / 1000000).toFixed(1)}M/week</span>
                <span>Since {framework.releaseYear}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {framework.officialDocs && (
              <a href={framework.officialDocs} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass border border-surface-border text-sm text-gray-300 hover:text-white transition-colors">
                <ExternalLink size={14} /> Docs
              </a>
            )}
            {framework.githubUrl && (
              <a href={framework.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl glass border border-surface-border text-gray-400 hover:text-white transition-colors">
                <Globe size={16} />
              </a>
            )}
            <button
              onClick={() => isSaved ? dispatch(unsaveFramework(framework.slug)) : dispatch(saveFramework(framework.slug))}
              className={clsx("px-4 py-2 rounded-xl text-sm font-medium transition-colors border", isSaved ? "bg-accent-cyan/20 text-cyan-300 border-accent-cyan/40" : "glass border-surface-border text-gray-400 hover:text-white")}
            >
              {isSaved ? "Saved ✓" : "Save"}
            </button>
            <button
              onClick={() => dispatch(addToCompare({ id: framework._id, name: framework.name, slug: framework.slug, category: framework.category, logo: framework.logo, color: framework.color, description: framework.description, level: framework.level, tags: framework.tags, language: framework.language, stars: framework.stars, weeklyDownloads: framework.weeklyDownloads, performance: framework.performance, learningCurve: framework.learningCurve, ecosystem: framework.ecosystem, jobMarket: framework.jobMarket }))}
              className="px-4 py-2 rounded-xl bg-primary-500/20 text-primary-300 border border-primary-500/40 text-sm font-medium hover:bg-primary-500/30 transition-colors"
            >
              + Compare
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-8 border-b border-surface-border overflow-x-auto scrollbar-thin">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={clsx(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
              activeTab === id
                ? "border-primary-500 text-primary-300"
                : "border-transparent text-gray-500 hover:text-gray-300"
            )}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div key="overview" variants={tabSlide} initial="hidden" animate="visible" exit="exit">
            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Performance", value: framework.performance, color: "#10b981" },
                { label: "Learning Curve", value: 100 - framework.learningCurve, tip: "Higher = easier", color: "#6366f1" },
                { label: "Ecosystem", value: framework.ecosystem, color: "#8b5cf6" },
                { label: "Job Market", value: framework.jobMarket, color: "#00d4ff" },
              ].map(({ label, value, color }) => (
                <div key={label} className="glass rounded-xl p-4 border border-surface-border">
                  <div className="text-xs text-gray-500 mb-3">{label}</div>
                  <div className="text-2xl font-bold text-white mb-2">{value}<span className="text-sm text-gray-500">/100</span></div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Long description */}
            {framework.longDescription && (
              <div className="glass rounded-2xl p-6 border border-surface-border mb-6">
                <h3 className="text-white font-semibold mb-3">About {framework.name}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{framework.longDescription}</p>
              </div>
            )}

            {/* Use cases */}
            {framework.useCases?.length > 0 && (
              <div className="glass rounded-2xl p-6 border border-surface-border">
                <h3 className="text-white font-semibold mb-4">Use Cases</h3>
                <ul className="space-y-2">
                  {framework.useCases.map((uc: string) => (
                    <li key={uc} className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle2 size={15} className="text-accent-green mt-0.5 shrink-0" /> {uc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "setup" && (
          <motion.div key="setup" variants={tabSlide} initial="hidden" animate="visible" exit="exit">
            {steps.length === 0 ? (
              <div className="text-center py-16 text-gray-500">No setup guide available yet.</div>
            ) : (
              <>
                {/* Progress */}
                <div className="mb-6 glass rounded-xl p-4 border border-surface-border flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>Setup Progress</span>
                      <span>{completedCount}/{steps.length} steps</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-purple"
                        animate={{ width: `${(completedCount / steps.length) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {steps.map((step: any, i: number) => {
                    const done = slugSteps?.has(i) ?? false;
                    return (
                      <div key={i} className={clsx("glass rounded-xl border transition-colors", done ? "border-accent-green/30" : "border-surface-border")}>
                        <button
                          className="w-full flex items-center gap-4 p-4 text-left"
                          onClick={() => setOpenStep(openStep === i ? null : i)}
                        >
                          <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors", done ? "bg-accent-green/20 text-accent-green" : "bg-white/5 text-gray-400")}>
                            {done ? <Check size={14} /> : i + 1}
                          </div>
                          <span className={clsx("font-medium text-sm", done ? "text-gray-400 line-through" : "text-white")}>{step.explanation}</span>
                          <ChevronDown size={16} className={clsx("ml-auto text-gray-500 transition-transform", openStep === i && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {openStep === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="px-4 pb-4 pt-0">
                                {step.command && (
                                  <div className="flex items-center justify-between bg-gray-900 rounded-lg p-3 font-mono text-sm text-accent-cyan mb-3 border border-surface-border">
                                    <code>$ {step.command}</code>
                                    <CopyButton code={step.command} />
                                  </div>
                                )}
                                <button
                                  onClick={() => done ? uncompleteStep(framework.slug, i) : completeStep(framework.slug, i)}
                                  className={clsx("text-xs px-3 py-1.5 rounded-lg font-medium transition-colors", done ? "bg-white/5 text-gray-400 hover:text-white" : "bg-accent-green/20 text-accent-green hover:bg-accent-green/30")}
                                >
                                  {done ? "Mark incomplete" : "Mark complete ✓"}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        )}

        {activeTab === "snippets" && (
          <motion.div key="snippets" variants={tabSlide} initial="hidden" animate="visible" exit="exit">
            {framework.codeSnippets?.length === 0 ? (
              <div className="text-center py-16 text-gray-500">No code snippets available yet.</div>
            ) : (
              <div className="space-y-4">
                {(framework.codeSnippets ?? []).map((snippet: any, i: number) => (
                  <div key={i} className="glass rounded-xl border border-surface-border overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
                      <span className="text-sm font-medium text-white">{snippet.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">{snippet.language}</span>
                        <CopyButton code={snippet.code} />
                      </div>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm text-gray-300 scrollbar-thin">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "pros-cons" && (
          <motion.div key="pros-cons" variants={staggerContainer} initial="hidden" animate="visible" exit="exit" className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp} className="glass rounded-2xl p-6 border border-accent-green/20">
              <h3 className="text-accent-green font-semibold mb-4 flex items-center gap-2"><CheckCircle2 size={18} /> Pros</h3>
              <ul className="space-y-3">
                {(framework.pros ?? []).map((pro: string) => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={14} className="text-accent-green mt-0.5 shrink-0" /> {pro}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="glass rounded-2xl p-6 border border-red-500/20">
              <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2"><XCircle size={18} /> Cons</h3>
              <ul className="space-y-3">
                {(framework.cons ?? []).map((con: string) => (
                  <li key={con} className="flex items-start gap-2 text-sm text-gray-300">
                    <XCircle size={14} className="text-red-400 mt-0.5 shrink-0" /> {con}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
