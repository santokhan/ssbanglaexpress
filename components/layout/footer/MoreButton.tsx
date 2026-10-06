'use client'

import Link from "next/link"

const MoreButton=()=>{
    const playClick = () => {
      const audio = new Audio('/assets/sounds/click.mp3')
      void audio.play().catch(() => undefined)
    }
    
    return(
        <Link href="/about" className="underline" onClick={playClick}>more</Link>
    )
}

export default MoreButton
