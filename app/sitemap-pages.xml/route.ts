const SITE_URL = `https://${process.env.DOMAIN ?? "ssbanglaexpress.com"}`;

const publicPaths = [
  "/",
  "/about",
  "/blogs",
  "/book",
  "/cancellation",
  "/contact",
  "/quote",
  "/rate-calculator",
  "/services",
  "/team",
  "/terms",
  "/tools",
  "/privacy",
];

export function GET() {
  const urls = publicPaths
    .map((path) => `  <url><loc>${SITE_URL}${path === "/" ? "" : path}</loc></url>`)
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
