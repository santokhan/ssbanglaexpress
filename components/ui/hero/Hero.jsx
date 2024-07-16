const Hero = () => {
    return (
        <header className="h-[calc(100svh_-_64px)]">
            <video className="w-full h-full object-cover" loop autoPlay>
                <source src="/assets/video/hero.webm" type="video/webm" />
                Video is not available
            </video>
        </header>
    )
}

export default Hero