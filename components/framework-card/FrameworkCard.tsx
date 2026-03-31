"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Download, BookOpen, Plus, Check, Bookmark, BookmarkCheck } from "lucide-react";
import { clsx } from "clsx";
import { fadeUp } from "@/lib/animations";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addToCompare, removeFromCompare } from "@/lib/redux/slices/compareSlice";
import { saveFramework, unsaveFramework } from "@/lib/redux/slices/userSlice";
import { useSession } from "next-auth/react";
import type { FrameworkSummary } from "@/lib/redux/slices/frameworksSlice";

const categoryColors: Record<string, string> = {
  frontend: "badge-frontend",
  backend: "badge-backend",
  fullstack: "badge-fullstack",
  mobile: "badge-mobile",
  css: "badge-css",
  testing: "badge-testing",
  devops: "badge-devops",
};

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

interface FrameworkCardProps {
  framework: FrameworkSummary;
  index?: number;
}

export function FrameworkCard({ framework, index = 0 }: FrameworkCardProps) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const compareSelected = useAppSelector((s) => s.compare.selected);
  const savedFrameworks = useAppSelector((s) => s.user.savedFrameworks);

  const isComparing = compareSelected.some((f) => f.slug === framework.slug);
  const isSaved = savedFrameworks.includes(framework.slug);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isComparing) dispatch(removeFromCompare(framework.slug));
    else dispatch(addToCompare(framework));
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (session?.user?.plan !== "premium" && session?.user?.role !== "admin") {
      // We need a way to open the global paywall or a local one
      // For now, let's assume the user will see a toast or we can use a store
      alert("Upgrade to Pro to save frameworks to your collection!");
      return;
    }
    if (isSaved) dispatch(unsaveFramework(framework.slug));
    else dispatch(saveFramework(framework.slug));
  };

  // Popularity normalized to 0-100 using a log scale approximate
  const popularityScore = Math.min(100, Math.round((Math.log10(framework.weeklyDownloads + 1) / 8) * 100));

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={index}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      <Link href={`/frameworks/${framework.slug}`}>
        <div
          className="relative glass rounded-2xl p-5 card-hover border border-surface-border hover:border-primary-500/40 transition-colors duration-300 h-full flex flex-col"
          style={{
            background: `linear-gradient(135deg, rgba(26,26,46,0.8) 0%, rgba(26,26,46,0.4) 100%)`,
          }}
        >
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Logo / Color circle */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${framework.color}22`, border: `1px solid ${framework.color}44` }}
              >
                <span style={{ color: framework.color }}>{framework.name.slice(0, 2)}</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base group-hover:text-primary-300 transition-colors">
                  {framework.name}
                </h3>
                <span className={clsx("text-xs font-medium px-2 py-0.5 rounded-full", categoryColors[framework.category] ?? "badge-frontend")}>
                  {framework.category}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={toggleSave}
                className={clsx(
                  "p-1.5 rounded-lg transition-colors",
                  isSaved ? "text-accent-cyan bg-accent-cyan/10" : "text-gray-500 hover:text-white hover:bg-white/5"
                )}
                title={isSaved ? "Unsave" : "Save"}
              >
                {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
              </button>
              <button
                onClick={toggleCompare}
                className={clsx(
                  "p-1.5 rounded-lg transition-colors",
                  isComparing ? "text-accent-green bg-accent-green/10" : "text-gray-500 hover:text-white hover:bg-white/5"
                )}
                title={isComparing ? "Remove from compare" : "Add to compare"}
              >
                {isComparing ? <Check size={14} /> : <Plus size={14} />}
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
            {framework.description}
          </p>

          {/* Popularity bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span>Popularity</span>
              <span>{popularityScore}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${framework.color}, ${framework.color}aa)` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${popularityScore}%` }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {framework.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-white/5 text-gray-400 text-xs rounded-md">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer stats */}
          <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-surface-border pt-3">
            <span className="flex items-center gap-1">
              <Star size={11} className="text-yellow-400" />
              {formatNumber(framework.stars)}
            </span>
            <span className="flex items-center gap-1">
              <Download size={11} className="text-accent-cyan" />
              {formatNumber(framework.weeklyDownloads)}/wk
            </span>
            <span className="ml-auto flex items-center gap-1 text-primary-400">
              <BookOpen size={11} /> Explore →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
