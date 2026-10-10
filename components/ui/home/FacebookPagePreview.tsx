import Image from "next/image";
import { Share2, ThumbsUp } from "lucide-react";
import coverImage from "@/assets/images/services-image.webp";

const facebookPageUrl = "https://www.facebook.com/ssbanglaexpress1";
const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(facebookPageUrl)}`;

const backdropTiles = ["F8", "▶", "✦", "◉", "f", "↗", "✉", "◎", "⌁", "f", "◇", "↗"];

export default function FacebookPagePreview() {
  return (
    <section aria-labelledby="facebook-preview-title" className="relative isolate space-y-0 overflow-hidden bg-white py-16 sm:py-20" id="components-ui-home-facebookpagepreview-section-1">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-between overflow-hidden px-1 opacity-55 sm:px-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {backdropTiles.slice(0, 6).map((tile, index) => (
            <span key={`left-${index}`} className="grid size-10 place-items-center border border-slate-200 bg-slate-100 text-lg font-bold text-slate-400 shadow-sm sm:size-14 sm:text-xl">{tile}</span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {backdropTiles.slice(6).map((tile, index) => (
            <span key={`right-${index}`} className="grid size-10 place-items-center border border-slate-200 bg-slate-100 text-lg font-bold text-slate-400 shadow-sm sm:size-14 sm:text-xl">{tile}</span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <h2 id="facebook-preview-title" className="sr-only">SS Bangla Express on Facebook</h2>
        <div className="relative mx-auto flex min-h-[280px] max-w-5xl items-end overflow-hidden border border-white/70 bg-[#18333a] shadow-[0_28px_70px_-30px_rgba(20,30,35,0.5)] sm:min-h-[320px]">
          <Image
            src={coverImage}
            alt=""
            fill
            priority={false}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#101c24]/85 via-[#101c24]/45 to-[#101c24]/10" />

          <div className="relative z-10 flex w-full flex-col gap-7 p-5 text-white sm:p-8 md:flex-row md:items-end md:justify-between md:p-10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="grid size-[76px] shrink-0 place-items-center border-4 border-white bg-[#1877f2] text-5xl font-bold leading-none shadow-lg sm:size-[104px] sm:text-7xl" aria-hidden="true">f</div>
              <div className="pt-1 sm:pt-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Follow us on</p>
                <p className="mt-1 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">Facebook</p>
                <p className="mt-2 text-sm font-medium text-white/90 sm:text-base">SS Bangla Express</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ThumbsUp aria-hidden="true" size={17} className="fill-[#1877f2] text-[#1877f2]" />
                Visit Facebook Page
              </a>
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Share2 aria-hidden="true" size={18} />
                Share
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
