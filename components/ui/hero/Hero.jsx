const Hero = () => {
    return (
        <header className="w-full aspect-[4/3] aspect-square+ md:aspect-video max-h-[calc(100svh_-_64px)] bg-cover bg-center bg-[url(/assets/images/hero-image.png)] bg-[#013644] text-white">
            <section className="section container mx-auto h-full flex items-center">
                <div className="max-w-2xl space-y-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white !leading-[1.2]">
                        Trusted Transport Logistic Company
                    </h1>
                    <p className="text-base sm:text-xl max-w-xl">With our commitment excellence dedication customer satisfaction, we're here streamline supply chain and drive your business.</p>
                </div>
            </section>
        </header>
    )
}

export default Hero