import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import Framework from "@/models/Framework";
import Fuse from "fuse.js";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const query = new URL(request.url).searchParams.get("q") ?? "";
    if (!query) return NextResponse.json({ results: [] });

    const frameworks = await Framework.find({})
      .select("name slug category description tags language color")
      .lean();

    const fuse = new Fuse(frameworks, {
      keys: ["name", "description", "tags", "language"],
      threshold: 0.35,
      includeScore: true,
    });

    const results = fuse.search(query).slice(0, 8).map((r) => r.item);
    return NextResponse.json({ results });
  } catch (error) {
    console.error("GET /api/search error:", error);
    // Return fallback empty results instead of hanging
    return NextResponse.json({ results: [], error: "Database unavailable" }, { status: 503 });
  }
}
