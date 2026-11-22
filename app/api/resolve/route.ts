
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = body.url;

    if (typeof url !== "string" || !url.trim()) {
      return NextResponse.json(
        { error: "Please provide a valid URL." },
        { status: 400 }
      );
    }

    let parsed: URL;

    try {
      parsed = new URL(url.trim());
    } catch {
      return NextResponse.json(
        { error: "The URL is invalid." },
        { status: 400 }
      );
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return NextResponse.json(
        { error: "Only HTTP and HTTPS links are supported." },
        { status: 400 }
      );
    }

    const host = parsed.hostname.toLowerCase();

    let platform = "Other";

    if (host === "tiktok.com" || host.endsWith(".tiktok.com")) {
      platform = "TikTok";
    } else if (
      host === "instagram.com" ||
      host.endsWith(".instagram.com")
    ) {
      platform = "Instagram";
    } else if (
      host === "facebook.com" ||
      host.endsWith(".facebook.com") ||
      host === "fb.watch"
    ) {
      platform = "Facebook";
    } else if (
      host === "youtube.com" ||
      host.endsWith(".youtube.com") ||
      host === "youtu.be"
    ) {
      platform = "YouTube";
    }

    return NextResponse.json({
      success: true,
      platform,
      message:
        "Link recognized. Media retrieval is not connected yet."
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process this request." },
      { status: 500 }
    );
  }
}
