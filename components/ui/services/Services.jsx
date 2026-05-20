import SectionTitle from "@/components/common/SectionTitle";

const Services = () => {
    const services = [
        'International courier shipping',
        'Garments logistics & export support',
        'Customs clearance assistance',
        'Door-to-door parcel delivery',
        'Roadside collection in Dhaka',
        'Live shipment tracking',
    ];

    return (
        <section className="section bg-[#54312d] text-white">
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="rounded-[2rem] border border-white/10 bg-[#3e1f25]/90 p-10 shadow-2xl">
                    <div className="text-center">
                        <SectionTitle className="text-white">Our Services</SectionTitle>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                            From garments export to courier and cargo delivery, we support businesses with end-to-end international shipping and reliable Bangladesh logistics.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
                            >
                                <p className="text-sm uppercase tracking-[0.2em] text-[#b81e46]">Service</p>
                                <p className="mt-4 text-lg font-semibold text-white">{service}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;