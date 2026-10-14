import { MetadataRoute } from "next";

export default function Sitemap(): MetadataRoute.Sitemap {
    const publicPaths = [
        "/",
        "/about",
        "/blogs",
        "/book",
        "/cancellation",
        "/contact",
        "/quote",
        "/rates",
        "/services",
        "/team",
        "/track",
        "/terms",
        "/tools",
        "/privacy",
    ];

    return publicPaths.map((path) => ({
        url: `https://www.ssbanglaexpress.com${path === "/" ? "" : path}`,
        lastModified: new Date().toISOString(),
    }));
}
