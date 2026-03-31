"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitCompare, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addToCompare, removeFromCompare } from "@/lib/redux/slices/compareSlice";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { clsx } from "clsx";

// Static frameworks for selection
const ALL_FRAMEWORKS = [
  { id: "1", name: "React", slug: "react", category: "frontend", logo: "", color: "#61dafb", description: "UI library", level: ["junior","mid","senior"], tags: [], language: "JavaScript", stars: 220000, weeklyDownloads: 25000000, performance: 85, learningCurve: 60, ecosystem: 98, jobMarket: 98 },
  { id: "2", name: "Vue", slug: "vue", category: "frontend", logo: "", color: "#42b883", description: "Progressive framework", level: ["junior","mid"], tags: [], language: "JavaScript", stars: 208000, weeklyDownloads: 5000000, performance: 88, learningCurve: 45, ecosystem: 85, jobMarket: 82 },
  { id: "3", name: "Angular", slug: "angular", category: "frontend", logo: "", color: "#dd0031", description: "Platform & framework", level: ["mid","senior"], tags: [], language: "TypeScript", stars: 95000, weeklyDownloads: 3500000, performance: 80, learningCurve: 75, ecosystem: 90, jobMarket: 88 },
  { id: "4", name: "Next.js", slug: "nextjs", category: "fullstack", logo: "", color: "#ffffff", description: "React framework", level: ["mid","senior"], tags: [], language: "JavaScript", stars: 125000, weeklyDownloads: 8000000, performance: 95, learningCurve: 65, ecosystem: 94, jobMarket: 95 },
  { id: "5", name: "Svelte", slug: "svelte", category: "frontend", logo: "", color: "#ff3e00", description: "Compiler framework", level: ["junior","mid"], tags: [], language: "JavaScript", stars: 79000, weeklyDownloads: 1000000, performance: 97, learningCurve: 40, ecosystem: 65, jobMarket: 55 },
  { id: "6", name: "Express", slug: "express", category: "backend", logo: "", color: "#68a063", description: "Node.js framework", level: ["junior","mid"], tags: [], language: "JavaScript", stars: 64000, weeklyDownloads: 32000000, performance: 82, learningCurve: 35, ecosystem: 95, jobMarket: 90 },
  { id: "7", name: "FastAPI", slug: "fastapi", category: "backend", logo: "", color: "#009688", description: "Python API framework", level: ["junior","mid","senior"], tags: [], language: "Python", stars: 75000, weeklyDownloads: 2000000, performance: 98, learningCurve: 40, ecosystem: 80, jobMarket: 78 },
  { id: "8", name: "Django", slug: "django", category: "backend", logo: "", color: "#2ba977", description: "Python web framework", level: ["junior","mid","senior"], tags: [], language: "Python", stars: 79000, weeklyDownloads: 1500000, performance: 75, learningCurve: 50, ecosystem: 88, jobMarket: 85 },
];

const METRICS = [
  { key: "performance", label: "Performance", color: "#10b981" },
  { key: "learningCurve", label: "Learning Ease", transform: (v: number) => 100 - v, color: "#6366f1" },
  { key: "ecosystem", label: "Ecosystem", color: "#8b5cf6" },
  { key: "jobMarket", label: "Job Market", color: "#00d4ff" },
];

export default function ComparePage() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((s) => s.compare.selected);
  const [search, setSearch] = useState("");

  const filtered = ALL_FRAMEWORKS.filter(
    (f) =>
      !selected.find((s) => s.slug === f.slug) &&
      f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">
          <span className="gradient-text">Compare</span> Frameworks
        </h1>
        <p className="text-gray-400">Select up to 4 frameworks to compare side by side.</p>
      </motion.div>

      {/* Selector */}
      <div className="glass rounded-2xl p-6 border border-surface-border mb-8">
        <div className="flex items-center gap-3 mb-4">
          <input
            placeholder="Search to add frameworks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-surface-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-500/60"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filtered.slice(0, 10).map((f) => (
            <button
              key={f.slug}
              onClick={() => selected.length < 4 && dispatch(addToCompare(f as any))}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-300 border border-surface-border transition-colors"
            >
              <span style={{ color: f.color }} className="font-semibold">{f.name.slice(0, 2)}</span>
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="text-center py-24 text-gray-500">
          <GitCompare size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Add frameworks above to start comparing.</p>
        </div>
      ) : (
        <>
          {/* Selected chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            {selected.map((f) => (
              <div key={f.slug} className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass border border-surface-border text-sm text-white">
                <span style={{ color: f.color }} className="font-bold">{f.name.slice(0, 2)}</span>
                {f.name}
                <button onClick={() => dispatch(removeFromCompare(f.slug))} className="text-gray-500 hover:text-white ml-1">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="glass rounded-2xl border border-surface-border overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-border">
                    <th className="text-left p-4 text-gray-500 font-medium text-sm w-40">Metric</th>
                    {selected.map((f) => (
                      <th key={f.slug} className="p-4 text-center">
                        <div style={{ color: f.color }} className="font-bold text-lg">{f.name.slice(0, 2)}</div>
                        <div className="text-white font-semibold text-sm">{f.name}</div>
                        <div className="text-gray-500 text-xs capitalize">{f.category}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {METRICS.map(({ key, label, transform, color }) => (
                    <tr key={key} className="border-b border-surface-border/50 hover:bg-white/2 transition-colors">
                      <td className="p-4 text-gray-400 text-sm font-medium">{label}</td>
                      {selected.map((f) => {
                        const raw = (f as any)[key] as number;
                        const val = transform ? transform(raw) : raw;
                        const best = Math.max(...selected.map((s) => {
                          const r = (s as any)[key] as number;
                          return transform ? transform(r) : r;
                        }));
                        return (
                          <td key={f.slug} className="p-4">
                            <div className="flex flex-col items-center gap-1.5">
                              <span className={clsx("text-xl font-bold", val === best ? "text-white" : "text-gray-400")}>
                                {val}
                                {val === best && <span className="text-xs text-accent-green ml-1">★</span>}
                              </span>
                              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ background: color, opacity: val === best ? 1 : 0.4 }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${val}%` }}
                                  transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-b border-surface-border/50">
                    <td className="p-4 text-gray-400 text-sm font-medium">Language</td>
                    {selected.map((f) => (
                      <td key={f.slug} className="p-4 text-center text-sm text-gray-300">{f.language}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-400 text-sm font-medium">Detail Page</td>
                    {selected.map((f) => (
                      <td key={f.slug} className="p-4 text-center">
                        <Link href={`/frameworks/${f.slug}`} className="inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300">
                          View <ArrowRight size={12} />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
