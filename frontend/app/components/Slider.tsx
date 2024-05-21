import React, { useEffect, useState } from "react"

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
        <div className="flex gap-4 items-center mx-20">
            <button
                    className="button h-max disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    disabled={selectedSlideIndex === 0}
                    onClick={() => setSelectedSlideIndex((curr) => curr - 1)}
                >
                <svg className="rotate-180 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>


            {slides[selectedSlideIndex]}

            <button
                className="button h-max disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                disabled={selectedSlideIndex === (slides.length - 1)}
                onClick={() => setSelectedSlideIndex((curr) => curr + 1)}
            >
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </div>
    )
}

export function Slide({ slideContent }: any) {
    return <div dangerouslySetInnerHTML={{ __html: slideContent }}></div>
}

export default Slider
