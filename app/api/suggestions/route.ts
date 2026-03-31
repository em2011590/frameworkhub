import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import Framework from "@/models/Framework";

const learningPaths: Record<string, string[]> = {
  react: ["nextjs", "remix", "react-native", "expo"],
  vue: ["nuxt", "quasar"],
  angular: ["nestjs", "ionic"],
  svelte: ["sveltekit"],
  express: ["fastify", "nestjs", "koa"],
  django: ["fastapi", "flask"],
  nextjs: ["remix", "astro", "sveltekit"],
  laravel: ["livewire", "inertia"],
};

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { knownFrameworks = [], level = "junior" } = await request.json();

    // Build suggestion slugs
    const suggestions = new Set<string>();
    for (const slug of knownFrameworks) {
      const paths = learningPaths[slug] ?? [];
      paths.forEach((s) => suggestions.add(s));
    }

    // If no specific paths, recommend by level
    if (suggestions.size === 0) {
      const levelMap: Record<string, string[]> = {
        junior: ["react", "vue", "express", "tailwind"],
        mid: ["nextjs", "nestjs", "fastapi", "svelte"],
        senior: ["remix", "astro", "gin", "spring-boot"],
      };
      (levelMap[level] ?? levelMap.junior).forEach((s) => suggestions.add(s));
    }

    const slugsToFetch = [...suggestions].filter((s) => !knownFrameworks.includes(s)).slice(0, 6);
    const frameworks = await Framework.find({ slug: { $in: slugsToFetch } })
      .select("name slug category description color logo level")
      .lean();

    return NextResponse.json({ suggestions: frameworks });
  } catch (error) {
    console.error("POST /api/suggestions error:", error);
    // Return fallback suggestions instead of hanging
    return NextResponse.json({ suggestions: [], error: "Database unavailable" }, { status: 503 });
  }
}
