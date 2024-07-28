import SectionTitle from "@/components/common/SectionTitle";

const Hero = () => {
    const backgroundImage = "url(/assets/images/about/about-us.jpg)";
    const breadcrumbItems = [
        { label: "Home", link: "/" },
        { label: "About", link: "/about" },
    ];

    return (
        <div
            className="bg-cover bg-center bg-no-repeat bg-gray-50"
            style={{ backgroundImage }}
        >
            <div className="bg-white/20+">
                <section className="section space-y-8 min-h-[40vh] flex items-center">
                    <div className="container mx-auto px-4">
                        <SectionTitle>Blogs</SectionTitle>
                        {/* <Breadcrumbs breadcrumbs={breadcrumbItems} /> */}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Hero