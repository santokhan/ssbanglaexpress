const youtubeIframe = "";

function getYoutubeEmbedUrl(iframe: string) {
  const src = iframe.match(/<iframe\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i)?.[1];
  if (!src) return null;

  try {
    const url = new URL(src);
    if (
      url.protocol !== "https:" ||
      !["www.youtube.com", "youtube.com", "www.youtube-nocookie.com", "youtube-nocookie.com"].includes(url.hostname) ||
      !url.pathname.startsWith("/embed/")
    ) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

export default function YoutubeVideo() {
  const embedUrl = getYoutubeEmbedUrl(youtubeIframe);
  if (!embedUrl) return null;

  return (
    <section aria-label="Featured video" className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
          <iframe
            src={embedUrl}
            title="SS Bangla Express YouTube video"
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
