'use client'

const Copyright = () => {
    const playClick = () => {
        const audio = new Audio('/assets/sounds/click.mp3')
        void audio.play().catch(() => undefined)
    }

    return (
        <div className="border-t mx-auto px-4 py-4 lg:py-5">
            <p className="text-center leading-5 text-gray-500">
                &copy; {new Date().getFullYear()} SS Bangla Express. All rights reserved. Developed by <a href="https://github.com/santokhan" className="underline" onClick={playClick}>Santo</a>
            </p>
        </div>
    );
};

export default Copyright;
