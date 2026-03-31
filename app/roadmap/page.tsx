"use client";

import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Plus, Trash2, Map, Calendar, Download, Lock } from "lucide-react";
import { clsx } from "clsx";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useSession } from "next-auth/react";

const SUGGESTED = [
  { slug: "html-css", name: "HTML & CSS", weeks: 3, color: "#f97316" },
  { slug: "javascript", name: "JavaScript", weeks: 4, color: "#f59e0b" },
  { slug: "react", name: "React", weeks: 6, color: "#61dafb" },
  { slug: "nextjs", name: "Next.js", weeks: 5, color: "#ffffff" },
  { slug: "express", name: "Express", weeks: 3, color: "#68a063" },
  { slug: "mongodb", name: "MongoDB", weeks: 2, color: "#47a248" },
  { slug: "typescript", name: "TypeScript", weeks: 3, color: "#3178c6" },
  { slug: "tailwind", name: "Tailwind CSS", weeks: 2, color: "#38bdf8" },
];

interface RoadmapItem {
  slug: string;
  name: string;
  weeks: number;
  color: string;
}

export default function RoadmapPage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<RoadmapItem[]>([
    SUGGESTED[0], SUGGESTED[1], SUGGESTED[2],
  ]);
  const [title, setTitle] = useState("My Learning Roadmap");

  const totalWeeks = items.reduce((sum, i) => sum + i.weeks, 0);
  const totalMonths = (totalWeeks / 4).toFixed(1);

  const addItem = (item: RoadmapItem) => {
    if (!items.find((i) => i.slug === item.slug)) {
      setItems((prev) => [...prev, item]);
    }
  };

  const removeItem = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));

  const updateWeeks = (slug: string, weeks: number) => {
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, weeks } : i)));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">
          <span className="gradient-text">Roadmap</span> Builder
        </h1>
        <p className="text-gray-400">Drag and arrange frameworks into your personal learning path.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="glass rounded-2xl p-4 border border-surface-border">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-xl font-bold text-white focus:outline-none placeholder-gray-600"
              placeholder="Roadmap title..."
            />
          </div>

          {/* Drag list */}
          <div className="glass rounded-2xl p-4 border border-surface-border">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4 px-1">
              Learning Path (drag to reorder)
            </div>
            <Reorder.Group values={items} onReorder={setItems} className="space-y-3">
              <AnimatePresence>
                {items.map((item, index) => (
                  <Reorder.Item key={item.slug} value={item}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-4 p-3 rounded-xl glass border border-surface-border cursor-grab active:cursor-grabbing hover:border-primary-500/30 transition-colors"
                    >
                      <div className="text-gray-600 font-mono text-sm w-6 text-center">{index + 1}</div>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ background: `${item.color}22`, color: item.color }}
                      >
                        {item.name.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{item.name}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-gray-500" />
                        <input
                          type="number"
                          min={1}
                          max={52}
                          value={item.weeks}
                          onChange={(e) => updateWeeks(item.slug, Number(e.target.value))}
                          className="w-12 bg-white/5 text-white text-sm text-center rounded-lg py-1 focus:outline-none border border-surface-border"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="text-gray-500 text-xs">wks</span>
                      </div>
                      <button onClick={() => removeItem(item.slug)} className="text-gray-600 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>

            {items.length === 0 && (
              <div className="text-center py-8 text-gray-600">
                <Map size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Add frameworks from the right panel</p>
              </div>
            )}
          </div>

          {/* Timeline visual */}
          {items.length > 0 && (
            <div className="glass rounded-2xl p-6 border border-surface-border">
              <div className="text-sm font-medium text-gray-400 mb-4">Timeline Preview</div>
              <div className="flex items-end gap-1 h-24 overflow-x-auto scrollbar-thin pb-1">
                {items.map((item) => (
                  <div key={item.slug} className="flex flex-col items-center gap-1 shrink-0" style={{ width: `${Math.max(item.weeks * 12, 50)}px` }}>
                    <div
                      className="w-full rounded-t-lg flex items-end justify-center pb-1 text-xs font-medium"
                      style={{
                        height: `${Math.min(item.weeks * 8 + 20, 80)}px`,
                        background: `${item.color}33`,
                        border: `1px solid ${item.color}55`,
                        color: item.color,
                      }}
                    >
                      {item.name.slice(0, 3)}
                    </div>
                    <div className="text-gray-600 text-xs">{item.weeks}w</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Stats + suggestions */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="glass rounded-2xl p-5 border border-surface-border">
            <div className="text-sm font-medium text-gray-400 mb-4">Roadmap Stats</div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Frameworks</span>
                <span className="text-white font-semibold">{items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total weeks</span>
                <span className="text-white font-semibold">{totalWeeks}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Estimated</span>
                <span className="gradient-text font-bold">{totalMonths} months</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button 
                onClick={() => {
                  if (session?.user?.plan !== "premium" && session?.user?.role !== "admin") {
                    alert("Upgrade to Pro to save custom learning paths!");
                  } else {
                    alert("Roadmap saved to your profile!");
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-500 transition-all glow-primary"
              >
                <Plus size={14} /> Save to Profile
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-gray-400 border border-surface-border text-sm font-medium hover:bg-white/10 transition-colors">
                <Download size={14} /> Export Roadmap
              </button>
            </div>
          </div>

          {/* Suggested additions */}
          <div className="glass rounded-2xl p-5 border border-surface-border">
            <div className="text-sm font-medium text-gray-400 mb-4">Suggested Topics</div>
            <div className="space-y-2">
              {SUGGESTED.filter((s) => !items.find((i) => i.slug === s.slug)).map((item) => (
                <button
                  key={item.slug}
                  onClick={() => addItem(item)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group text-left"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${item.color}22`, color: item.color }}>
                    {item.name.slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{item.name}</div>
                    <div className="text-gray-500 text-xs">~{item.weeks} weeks</div>
                  </div>
                  <Plus size={14} className="text-gray-600 group-hover:text-primary-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
