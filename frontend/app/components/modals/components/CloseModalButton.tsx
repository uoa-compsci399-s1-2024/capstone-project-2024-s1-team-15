import React from "react";

export default function CloseModalButton({ onClick, dark = false }: { onClick: () => void, dark?: boolean }) {
    const className = dark ?
        'text-white hover:bg-white hover:text-red-500' :
        'text-black hover:bg-black hover:bg-opacity-40 hover:text-white'
    return (
        <button
            className={`grow-0 -mr-1 -mt-1 shrink-0 flex items-center justify-center rounded-full bg-black bg-opacity-10 transition-all ${className}
                w-9 h-9
                sm:w-10 sm:h-10
                md:w-12 md:h-12
            `} onClick={onClick}
        >
            <svg className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 flex-shrink-0`} aria-hidden={"true"}
                 xmlns={"http://www.w3.org/2000/svg"}
                 fill={"none"} viewBox={"0 0 14 14"}>
                <path stroke="currentColor" strokeLinecap={"round"} strokeLinejoin={"round"}
                      strokeWidth={"2"} d={"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"}/>
            </svg>
        </button>
    )
}
