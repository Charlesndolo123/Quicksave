
const allowedDomains = [
  "tiktok.com",
  "instagram.com",
  "facebook.com",
  "fb.watch",
  "youtube.com",
  "youtu.be",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = body.url;

    if (
      typeof url !== "string" ||
      url.length > 2048
    ) {
      return Response.json(
        { error: "Please provide a valid media URL." },
        { status: 400 }
      );
    }

    let parsed: URL;

    try {
      parsed = new URL(url);
    } catch {
      return Response.json(
        { error: "Invalid media URL." },
        { status: 400 }
      );
    }

    const validDomain = allowedDomains.some(
      (domain) =>
        parsed.hostname === domain ||
        parsed.hostname.endsWith("." + domain)
    );

    if (
      parsed.protocol !== "https:" ||
      parsed.username ||
      parsed.password ||
      !validDomain
    ) {
      return Response.json(
        { error: "This platform is not supported." },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        status: "provider_not_configured",
        platform: allowedDomains.find(
          (domain) =>
            parsed.hostname === domain ||
            parsed.hostname.endsWith("." + domain)
        ),
        supportedFormats: ["video", "audio"],
        message:
          "Media service configuration is required."
      },
      { status: 503 }
    );
  } catch {
    return Response.json(
      { error: "Unable to process this request." },
      { status: 500 }
    );
  }
}
