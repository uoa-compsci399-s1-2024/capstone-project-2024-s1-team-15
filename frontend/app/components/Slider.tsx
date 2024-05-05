import React, { useEffect, useState } from "react"
import { Children, PropsWithChildren } from "react"

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
        <div className="flex gap-4 items-center">
            {selectedSlideIndex != 0 && (
                <button className="button" onClick={() => setSelectedSlideIndex((curr) => curr - 1)}>
                    {"<<"}
                </button>
            )}

            {slides[selectedSlideIndex]}

            {selectedSlideIndex != slides.length - 1 && (
                <button className="button" onClick={() => setSelectedSlideIndex((curr) => curr + 1)}>
                    {">>"}
                </button>
            )}
        </div>
    )
}

export function Slide({ slideContent }: any) {
    return <div dangerouslySetInnerHTML={{ __html: slideContent }}></div>
}

export default Slider
