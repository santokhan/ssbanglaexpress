'use client'

import Link from "next/link"
import { useState } from "react"

const MoreButton=()=>{
    const [clicked, setClicked] = useState(false)

    const playClick = () => {
      setClicked(true)
      const audio = new Audio('/assets/sounds/click.mp3')
      audio.play()
    }
    
    return(
        <Link href="/about" className="underline" onClick={playClick}>more</Link>
    )
}

export default MoreButton