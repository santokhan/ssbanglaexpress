import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[65svh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b81e46]">Error 404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">We can’t find that page</h1>
        <p className="mt-4 leading-7 text-slate-600">The address may have changed, or the page may no longer be available. You can return home or get in touch with our team.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="default">Back to home</Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">Contact us</Link>
        </div>
      </div>
    </main>
  );
}
