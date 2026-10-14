import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function isPublicIp(address: string) {
  if (isIP(address) === 4) {
    const [a, b] = address.split(".").map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168));
  }
  const value = address.toLowerCase();
  return value.startsWith("2001:") || value.startsWith("2600:") || value.startsWith("2a00:");
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url");
  if (!raw || raw.length > 2048) return NextResponse.json({}, { status: 400 });
  let url: URL;
  try { url = new URL(raw); } catch { return NextResponse.json({}, { status: 400 }); }
  if (!(["http:", "https:"].includes(url.protocol)) || url.username || url.password) return NextResponse.json({}, { status: 400 });
  try {
    const addresses = isIP(url.hostname) ? [{ address: url.hostname }] : await lookup(url.hostname, { all: true });
    if (!addresses.length || addresses.some(({ address }) => !isPublicIp(address))) return NextResponse.json({}, { status: 400 });
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(5000), headers: { "user-agent": "SSBanglaLinkPreview/1.0", accept: "text/html" } });
    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) return NextResponse.json({});
    const html = (await response.text()).slice(0, 1_000_000);
    const meta = (key: string) => {
      const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const tag = html.match(new RegExp(`<meta\\b(?=[^>]*(?:property|name)=["']${escaped}["'])[^>]*>`, "i"))?.[0];
      return tag?.match(/content=["']([^"']*)["']/i)?.[1]?.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'") ?? "";
    };
    const title = meta("og:title") || html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
    const image = meta("og:image") || meta("og:image:url");
    return NextResponse.json({ title: title.slice(0, 200), image: image ? new URL(image, url).href : "", description: (meta("og:description") || meta("description")).slice(0, 300) }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
  } catch {
    return NextResponse.json({});
  }
}
