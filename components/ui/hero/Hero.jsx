import Image from "next/image";
import shippingBoxes from "@/assets/images/shipping-boxes.png";

const Hero = () => {
    return (
        <section className="section bg-white">
            <div className="container mx-auto grid gap-10 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                    <span className="inline-flex items-center gap-3 rounded-full bg-[#b81e46]/10 px-4 py-1 text-sm font-medium text-[#b81e46]">
                        Bangladesh Courier Service
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
                        Fast, Safe & Reliable Parcel Delivery — Nationwide & International
                    </h1>

                    <p className="text-lg text-slate-600 max-w-2xl">
                        SS Bangla Express offers merchant-friendly pickups, cash-on-delivery,
                        and real-time tracking so your business and customers get parcels on
                        time.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <a
                            href="https://wa.me/8801611327764"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 rounded-full bg-[#b81e46] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#7d162f]"
                        >
                            Send Parcel Now
                        </a>
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm flex flex-col sm:flex-row items-center gap-3 max-w-2xl w-full">
                        <input
                            type="text"
                            placeholder="Enter tracking number"
                            className="w-full sm:flex-1 bg-transparent px-4 py-3 outline-none text-slate-700"
                        />
                        <button className="w-full sm:w-auto inline-flex justify-center items-center rounded-full bg-[#b81e46] px-5 py-2 text-sm font-semibold text-white hover:bg-[#7d162f]">
                            Track
                        </button>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
                        <div className="flex items-start gap-3">
                            <div className="size-10 shrink-0 rounded-lg bg-[#b81e46]/10 flex items-center justify-center text-[#b81e46] font-semibold">✓</div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Real-time tracking</p>
                                <p className="text-sm text-slate-500">Know parcel status instantly</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="size-10 shrink-0 rounded-lg bg-[#b81e46]/10 flex items-center justify-center text-[#b81e46] font-semibold">৳</div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Cash on delivery</p>
                                <p className="text-sm text-slate-500">Secure merchant settlements</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-200">
                        <Image
                            src={shippingBoxes}
                            alt="Shipping boxes"
                            className="w-full object-cover"
                            width={900}
                            height={700}
                        />
                    </div>

                    <div className="absolute -bottom-6 right-6 hidden sm:block">
                        <div className="rounded-2xl bg-white p-4 shadow border border-slate-100 w-64">
                            <p className="text-xs text-slate-500 uppercase tracking-wide">Service</p>
                            <h4 className="mt-1 font-semibold text-slate-900">International courier</h4>
                            <p className="mt-2 text-sm text-slate-600">Door-to-door shipping, customs support, and tracking.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
