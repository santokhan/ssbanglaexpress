import Link from "next/link"

const Hero = () => (
    <header className="w-full aspect-[4/3] aspect-square+ md:aspect-video max-h-[calc(100svh_-_64px)] bg-cover bg-center bg-[url(/assets/images/hero-image.png)] bg-[#013644] text-white">
        <section className="section container mx-auto h-full flex items-center">
            <div className="max-w-2xl space-y-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white !leading-[1.2]">
                    Trusted Transport Logistic Company
                </h1>
                <p className="text-base sm:text-xl max-w-xl">
                    With our commitment excellence dedication customer satisfaction, we&apos;re here streamline supply chain and drive your business.
                </p>
                <div>
                    <Link href="/rate-calculator" className="px-6 py-3 bg-white text-[#013644] font-semibold rounded-xl shadow-md hover:bg-gray-100 transition">
                        Rate Calculator
                    </Link>
                </div>
            </div>
        </section>
    </header>
)

export default Hero
