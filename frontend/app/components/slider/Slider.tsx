import React, { useEffect, useState } from "react"
import NextSlideArrow from "./NextSlideArrow.svg"
import Image from "next/image"

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
        <div className="flex gap-4 ">
            <button
                className={`w-10 hover:bg-slate-200 transition-colors rounded-md ${selectedSlideIndex === 0 ? "invisible" : ""}`}
                onClick={() => setSelectedSlideIndex((curr) => curr - 1)}>
                <Image
                    src={NextSlideArrow}
                    alt="Previous slide arrow icon"
                    className="w-full h-full origin-center rotate-180"
                />
            </button>

            <div className="flex-1 text-balance">{slides[selectedSlideIndex]}</div>

            <button
                className={`w-10 hover:bg-slate-200 transition-colors rounded-md ${selectedSlideIndex === slides.length - 1 ? "invisible" : ""}`}
                onClick={() => setSelectedSlideIndex((curr) => curr + 1)}>
                <Image src={NextSlideArrow} alt="Next slide arrow icon" className="w-full h-full" />
            </button>
        </div>
    )
}

export function Slide({ slideContent }: any) {
    return <>{slideContent}</>
}

export default Slider
