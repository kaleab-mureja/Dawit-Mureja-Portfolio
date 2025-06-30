// app/api/news/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import NewsModel, { INewsEntry } from "../../../models/News";
import { NewsEntry } from "../../../types/index";

export async function GET() {
  await dbConnect();
  try {
    const news = await NewsModel.find({}).lean().exec();
    const serializedNews: NewsEntry[] = news.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
      eventDate: entry.eventDate
        ? (entry.eventDate as Date).toISOString()
        : undefined,
      createdAt: (entry.createdAt as Date).toISOString(),
      updatedAt: (entry.updatedAt as Date).toISOString(),
    }));
    return NextResponse.json(serializedNews, { status: 200 });
  } catch (e: any) {
    console.error("API Error fetching news data:", e);
    return NextResponse.json(
      {
        message: "Error fetching news data",
        error: e.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
