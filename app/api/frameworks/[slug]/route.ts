import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import Framework from "@/models/Framework";
import { STATIC_FRAMEWORKS } from "@/lib/data/staticFrameworks";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(
  _req: NextRequest,
  { params }: RouteContext
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const framework = await Framework.findOne({ slug }).lean();
    if (!framework) {
      return NextResponse.json({ error: "Framework not found" }, { status: 404 });
    }
    return NextResponse.json(framework);
  } catch (error) {
    console.error("GET /api/frameworks/[slug] error:", error);
    
    // Fallback to static frameworks
    const { slug } = await params;
    const staticFramework = STATIC_FRAMEWORKS.find(f => f.slug === slug);
    if (staticFramework) {
      return NextResponse.json(staticFramework);
    }
    
    return NextResponse.json({ error: "Failed to fetch framework" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const body = await request.json();
    const framework = await Framework.findOneAndUpdate({ slug }, body, { new: true });
    if (!framework) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(framework);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: RouteContext
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    await Framework.findOneAndDelete({ slug });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
