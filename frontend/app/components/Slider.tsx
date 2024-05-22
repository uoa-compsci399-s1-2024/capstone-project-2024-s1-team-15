import React, { useEffect, useState } from "react"
import Button from "@/app/components/Button";
import icons from "@/app/lib/icons";

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
            <Button
                theme={"secondary"}
                disabled={selectedSlideIndex === 0}
                onClick={() => setSelectedSlideIndex(c => c - 1)}
                icon={icons.back}
            />

            {slides[selectedSlideIndex]}

            <Button
                theme={"secondary"}
                disabled={selectedSlideIndex === (slides.length - 1)}
                onClick={() => setSelectedSlideIndex(c => c + 1)}
                icon={icons.forward}
            />
        </div>
    )
}

export function Slide({ slideContent }: any) {
    return <div dangerouslySetInnerHTML={{ __html: slideContent }}></div>
}

export default Slider
