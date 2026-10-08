import { NextRequest, NextResponse } from "next/server";
import { parseFilters, queryServices } from "@/lib/query";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const queryObject = Object.fromEntries(searchParams);

    const filters = parseFilters(queryObject);

    const result = queryServices(filters);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("GET /api/services failed:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
