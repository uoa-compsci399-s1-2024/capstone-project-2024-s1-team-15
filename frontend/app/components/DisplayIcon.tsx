import React from "react"
import { Nullable } from "@/app/lib/types"
import Image from "next/image"
import defaultDisplayIcon from "@/app/public/defaultDisplayIcon.jpg"

type DisplayIconProps = {
    src: Nullable<string>,
    displayName?: string,
    className?: string,
    nextSize?: number
}

export default function DisplayIcon({ src, displayName, className, nextSize }: DisplayIconProps) {
    return (
        <Image
            src={src || defaultDisplayIcon}
            alt={`Display Icon${displayName && ` of ${displayName}`}`}
            className={`aspect-square object-cover rounded-full select-none ${className}`}
            height={nextSize || 256}
            width={nextSize || 256}
        />
    )
}
