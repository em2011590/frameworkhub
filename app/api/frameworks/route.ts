import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import Framework from "@/models/Framework";
import { STATIC_FRAMEWORKS } from "@/lib/data/staticFrameworks";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const level = searchParams.get("level");
  const language = searchParams.get("language");
  const limit = parseInt(searchParams.get("limit") ?? "100");
  const page = parseInt(searchParams.get("page") ?? "1");

  try {
    await connectToDatabase();
    
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

    return NextResponse.json({ frameworks, total, page, limit, fallback: false });
  } catch (error) {
    console.error("GET /api/frameworks error:", error);
    
    // Filter static frameworks based on query params
    let filtered = STATIC_FRAMEWORKS;
    
    if (category && category !== "all") {
      filtered = filtered.filter(f => f.category === category);
    }
    if (level && level !== "all") {
      filtered = filtered.filter(f => f.level.includes(level as any));
    }
    if (language && language !== "all") {
      filtered = filtered.filter(f => f.language === language);
    }
    
    const total = filtered.length;
    const paginatedStatic = filtered.slice((page - 1) * limit, page * limit);
    
    return NextResponse.json({ 
      frameworks: paginatedStatic, 
      total, 
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
