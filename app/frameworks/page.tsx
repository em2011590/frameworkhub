"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, Sparkles } from "lucide-react";
import { FrameworkCard } from "@/components/framework-card/FrameworkCard";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setFrameworks, setCategory, setLevel, setLanguage, setSearchQuery,
  setDeepSearchResults, setLoading, type Category, type Level, type FrameworkSummary,
} from "@/lib/redux/slices/frameworksSlice";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { clsx } from "clsx";
import { useSession } from "next-auth/react";
import { PaywallModal } from "@/components/premium/PaywallModal";

const CATEGORIES: Category[] = ["all", "frontend", "backend", "fullstack", "mobile", "css", "testing", "devops"];
const LEVELS: Level[] = ["all", "junior", "mid", "senior"];
const LANGUAGES = ["all", "JavaScript", "TypeScript", "Python", "PHP", "Java", "Go", "Rust", "Dart"];

function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-5 border border-surface-border animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-white/5 rounded" />
          <div className="h-3 w-16 bg-white/5 rounded" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-white/5 rounded" />
        <div className="h-3 w-3/4 bg-white/5 rounded" />
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full mb-4" />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => <div key={i} className="h-5 w-12 bg-white/5 rounded" />)}
      </div>
    </div>
  );
}

import { STATIC_FRAMEWORKS } from "@/lib/data/staticFrameworks";

export default function FrameworksPage() {
  const dispatch = useAppDispatch();
  const { filteredItems, loading, selectedCategory, selectedLevel, selectedLanguage, searchQuery } = useAppSelector((s) => s.frameworks);
  const { data: session } = useSession();
  const [showFilters, setShowFilters] = useState(false);
  const [isDeepSearch, setIsDeepSearch] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [deepSearchQuery, setDeepSearchQuery] = useState("");

  const handleDeepSearch = async () => {
    if (!deepSearchQuery.trim()) return;
    setIsAnalyzing(true);
    
    // Simulate AI delay
    await new Promise(r => setTimeout(r, 2000));
    
    // Simple mock logic: filter by keywords in the query
    const keywords = deepSearchQuery.toLowerCase().split(' ');
    const results = STATIC_FRAMEWORKS.filter(fw => 
      keywords.some(k => 
        fw.name.toLowerCase().includes(k) || 
        fw.description.toLowerCase().includes(k) ||
        fw.tags.some(t => t.toLowerCase().includes(k)) ||
        fw.category.toLowerCase().includes(k)
      )
    );
    
    dispatch(setDeepSearchResults(results.length > 0 ? results : STATIC_FRAMEWORKS));
    setIsAnalyzing(false);
  };

  useEffect(() => {
    async function fetchFrameworks() {
      dispatch(setLoading(true));
      try {
        const res = await fetch("/api/frameworks?limit=100");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const frameworks = data.frameworks as FrameworkSummary[];
        
        // If no frameworks returned, use static fallback
        if (!frameworks || frameworks.length === 0) {
          console.warn("No frameworks returned from API, using static fallback");
          dispatch(setFrameworks(STATIC_FRAMEWORKS));
        } else {
          dispatch(setFrameworks(frameworks));
        }
      } catch (error) {
        console.error("Failed to fetch frameworks:", error);
        // Last resort fallback (if even API fallback fails)
        dispatch(setFrameworks(STATIC_FRAMEWORKS));
      }
    }
    fetchFrameworks();
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">
          All <span className="gradient-text">Frameworks</span>
        </h1>
        <p className="text-gray-400">Discover and explore {filteredItems.length} frameworks across all categories.</p>
      </motion.div>

      {/* Search + Filter bar */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8 flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search frameworks..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl glass border border-surface-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500/60 transition-colors"
          />
          {searchQuery && (
            <button onClick={() => dispatch(setSearchQuery(""))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={clsx(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors",
            showFilters ? "bg-primary-500/20 text-primary-300 border-primary-500/40" : "glass border-surface-border text-gray-400 hover:text-white"
          )}
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </motion.div>

      {/* Filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="glass rounded-2xl p-6 border border-surface-border space-y-6">
              {/* Deep Search Toggle (Premium) */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-purple/10 border border-primary-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      Deep Search
                      <span className="text-[10px] bg-accent-purple px-1.5 py-0.5 rounded text-white font-black uppercase tracking-tighter">Pro</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">AI-powered deep logic search and analysis.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (session?.user?.plan !== "premium") {
                      setIsPaywallOpen(true);
                    } else {
                      setIsDeepSearch(!isDeepSearch);
                    }
                  }}
                  className={clsx(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                    isDeepSearch ? "bg-primary-600" : "bg-white/10"
                  )}
                >
                  <span
                    className={clsx(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      isDeepSearch ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {isDeepSearch && session?.user?.plan === "premium" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <textarea
                    placeholder="e.g., Which frameworks are best for a high-performance e-commerce site with SSR and a small team?"
                    value={deepSearchQuery}
                    onChange={(e) => setDeepSearchQuery(e.target.value)}
                    className="w-full h-24 glass border border-primary-500/30 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary-500 placeholder-gray-600 transition-all"
                  />
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={handleDeepSearch}
                      disabled={isAnalyzing || !deepSearchQuery.trim()}
                      className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white text-xs font-bold py-2 px-6 rounded-lg transition-all flex items-center gap-2"
                    >
                      {isAnalyzing ? (
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          AI Thinking...
                        </span>
                      ) : (
                        <>
                          <Sparkles size={14} /> Analyze Requirements
                        </>
                      )}
                    </button>
                    {isDeepSearch && (
                      <button 
                        onClick={() => {
                          setIsDeepSearch(false);
                          dispatch(setFrameworks(STATIC_FRAMEWORKS));
                        }}
                        className="text-xs text-gray-500 hover:text-white transition-colors underline"
                      >
                        Reset AI Analysis
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-surface-border/50">
                {/* Category */}
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Category</div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => dispatch(setCategory(cat))}
                      className={clsx(
                        "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors",
                        selectedCategory === cat
                          ? "bg-primary-500/30 text-primary-300 border border-primary-500/50"
                          : "bg-white/5 text-gray-400 hover:text-white border border-transparent"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {/* Level */}
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Level</div>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => dispatch(setLevel(level))}
                      className={clsx(
                        "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors",
                        selectedLevel === level
                          ? "bg-accent-purple/30 text-purple-300 border border-accent-purple/50"
                          : "bg-white/5 text-gray-400 hover:text-white border border-transparent"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              {/* Language */}
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Language</div>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => dispatch(setLanguage(lang))}
                      className={clsx(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        selectedLanguage === lang
                          ? "bg-accent-cyan/20 text-cyan-300 border border-accent-cyan/40"
                          : "bg-white/5 text-gray-400 hover:text-white border border-transparent"
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

      <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} />

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-24 text-gray-500">
          <div className="text-5xl mb-4">🔍</div>
          <div className="text-xl font-semibold text-gray-400 mb-2">No frameworks found</div>
          <p className="text-sm">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filteredItems.map((fw, i) => (
            <FrameworkCard key={fw.slug} framework={fw} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
