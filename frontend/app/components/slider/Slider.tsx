import React, { useEffect, useState } from "react"
import Image from "next/image"
import SlideRightImage from "./SlideRightImage.svg"

type Props = {
    slides: React.JSX.Element[]
    onSelectedSlideIndexChange?: any
}

function Slider({ slides, onSelectedSlideIndexChange }: Props) {
    const [selectedSlideIndex, setSelectedSlideIndex] = useState(0)

    useEffect(() => {
        onSelectedSlideIndexChange && onSelectedSlideIndexChange(selectedSlideIndex)
    }, [onSelectedSlideIndexChange, selectedSlideIndex])

    return (
        <div className="flex gap-6 items-center px-4">
            {selectedSlideIndex != 0 && (
                <button onClick={() => setSelectedSlideIndex((curr) => curr - 1)} className="w-24">
                    <Image src={SlideRightImage} className="w-full -scale-x-100" alt="move slider to the left" />
                </button>
            )}

            {slides[selectedSlideIndex]}

            {selectedSlideIndex != slides.length - 1 && (
                <button onClick={() => setSelectedSlideIndex((curr) => curr + 1)} className="w-24">
                    <Image src={SlideRightImage} className="w-full" alt="move slider to the right" />
                </button>
            )}
        </div>
    )
}

export function Slide({ slideContent }: any) {
    return <div dangerouslySetInnerHTML={{ __html: slideContent }}></div>
}

export default Slider
