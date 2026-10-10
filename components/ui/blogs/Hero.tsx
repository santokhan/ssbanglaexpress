import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative isolate overflow-hidden bg-slate-950 py-20 text-white sm:py-28" id="components-ui-blogs-hero-section-1">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(184,30,70,0.5),_transparent_55%)]" />
            <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-rose-200">From SS Bangla Express</p>
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">Shipping insights for <span className="text-rose-300">every journey.</span></h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Practical updates and guidance for sending parcels, preparing export shipments, and navigating international delivery.</p>
                    <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#b81e46] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]">Ask our team a question</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero
