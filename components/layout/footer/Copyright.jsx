'use client'

import { useState } from "react";

const Copyright = () => {
    const [clicked, setClicked] = useState(false)

    const playClick = () => {
        setClicked(true)
        const audio = new Audio('/assets/sounds/click.mp3')
        audio.play()
    }

    return (
        <div className="border-t mx-auto px-4 py-4 lg:py-5">
            <p className="text-center leading-5 text-gray-500">
                &copy; 2022. All rights reserved. Developed by <a href="https://github.com/santokhan" className="underline" onClick={playClick}>Santo</a>
            </p>
        </div>
    );
};

export default Copyright;