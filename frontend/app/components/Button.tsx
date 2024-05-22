import React from "react";

type ButtonProps = {
    onClick?: () => void
    className?: string
    theme?: "primary" | "secondary" | "red" | "green" | "cms"
    icon?: React.JSX.Element
    text?: string
    cms?: boolean
}

export default function Button({ onClick, className, theme = "primary", text, icon }: ButtonProps) {
    let colorClass: string

    switch (theme) {
        case "primary": {
            colorClass = "bg-primary bg-opacity-60"
            break
        }
        case "secondary": {
            colorClass = "bg-secondary bg-opacity-30"
            break
        }
        case "red": {
            colorClass = "bg-red-500 bg-opacity-40"
            break
        }
        case "green": {
            colorClass = "bg-green-500 bg-opacity-40"
            break
        }
        case "cms": {
            colorClass = "bg-maintainer bg-opacity-40 border-2 border-dashed border-black"
        }
    }


    let alignmentClass: string
    if (icon) {
        if (text) {
            // Text & Icon
            alignmentClass = "pl-6 pr-3 py-2 justify-between"
        } else {
            // No Text & Icon
            alignmentClass = "p-2 justify-center"
        }
    } else {
        if (!text) {  // No Text & No Icon
            text = "Default Button"
        }
        // Text & No Icon
        alignmentClass = "px-6 py-2 justify-center"
    }

    return (
        <div className={"group rounded-full bg-white w-max drop-shadow-md hover:drop-shadow-xl transition"}>
            <button
                onClick={onClick}
                className={`${colorClass} ${className} font-medium w-auto rounded-full 
                flex flex-row items-center ${alignmentClass}
                group-hover:text-white group-hover:bg-opacity-100 transition
                sm:h-[33px] md:h-[35px] h-[37px]
                flex-grow space-x-3
            `}>
                {text &&
                    <p className={"text-[12px] sm:text-[13px] md:text-[14px]"}>
                        {text}
                    </p>
                }
                {icon &&
                    <div className={`h-full w-auto grow-0 group-hover:rotate-[12deg] transition ease-in-out`}>
                        {icon}
                    </div>
                }
            </button>
        </div>

    )
}