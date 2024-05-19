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
        <div className="flex gap-4">
            <button
                className={`button h-max disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed`}
                disabled={selectedSlideIndex === 0}
                onClick={() => setSelectedSlideIndex(curr => curr - 1)}
            >
                ⮜
            </button>

            {slides[selectedSlideIndex]}

            <button
                className={`button h-max disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed`}
                disabled={selectedSlideIndex === (slides.length - 1)}
                onClick={() => setSelectedSlideIndex(curr => curr + 1)}
            >
                ⮞
            </button>
        </div>
    )
}

export function Slide({ slideContent }: any) {
    return <div dangerouslySetInnerHTML={{ __html: slideContent }}></div>
}

export default Slider
