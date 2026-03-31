import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import Framework from "@/models/Framework";
import { STATIC_FRAMEWORKS } from "@/lib/data/staticFrameworks";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const language = searchParams.get("language");
    const limit = parseInt(searchParams.get("limit") ?? "100");
    const page = parseInt(searchParams.get("page") ?? "1");

    const query: Record<string, unknown> = {};
    if (category && category !== "all") query.category = category;
    if (level && level !== "all") query.level = { $in: [level] };
    if (language && language !== "all") query.language = language;

    const total = await Framework.countDocuments(query);
    const frameworks = await Framework.find(query)
      .select("name slug category logo color description level tags language stars weeklyDownloads performance learningCurve ecosystem jobMarket")
      .sort({ stars: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    return NextResponse.json({ frameworks, total, page, limit });
  } catch (error) {
    console.error("GET /api/frameworks error:", error);
    // Return static frameworks as fallback when database is unavailable
    const limit = parseInt(new URL(request.url).searchParams.get("limit") ?? "100");
    const page = parseInt(new URL(request.url).searchParams.get("page") ?? "1");
    const paginatedStatic = STATIC_FRAMEWORKS.slice((page - 1) * limit, page * limit);
    return NextResponse.json({ 
      frameworks: paginatedStatic, 
      total: STATIC_FRAMEWORKS.length, 
      page, 
      limit,
      fallback: true,
      error: "Using cached frameworks data (database unavailable)" 
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const framework = await Framework.create(body);
    return NextResponse.json(framework, { status: 201 });
  } catch (error) {
    console.error("POST /api/frameworks error:", error);
    return NextResponse.json({ error: "Failed to create framework" }, { status: 500 });
  }
}
