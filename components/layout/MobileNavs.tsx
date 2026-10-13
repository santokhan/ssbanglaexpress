"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import NavList from "./navbar/NavList";
import Social from "./footer/Social";

const MobileNavs = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:border-[#b81e46]/30 hover:bg-rose-50 hover:text-[#a3163c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[60] lg:hidden" role="presentation">
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
            />
            <aside
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
              className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-md flex-col overflow-y-auto bg-[#fffdfc] px-6 pb-8 pt-5 shadow-2xl shadow-slate-950/20 sm:px-8"
            >
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b81e46]">
                    SS Bangla Express
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Where would you like to go?
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-white hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]"
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </div>

              <NavList
                onNavigate={() => setOpen(false)}
                className="mt-7 flex-col items-stretch gap-2 text-lg"
              />

              <div className="mt-7 grid gap-3">
                <Link
                  href="/quote"
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between rounded-2xl bg-[#b81e46] px-5 text-base font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]"
                >
                  Request a quote{" "}
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                </Link>
              </div>

              <div className="mt-auto pt-10">
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Follow along
                </p>
                <div className="flex justify-center rounded-2xl bg-white p-3 ring-1 ring-slate-200/80">
                  <Social />
                </div>
              </div>
            </aside>
          </div>,
          document.body,
        )}
    </>
  );
};

export default MobileNavs;
