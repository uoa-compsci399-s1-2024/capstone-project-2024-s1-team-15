import React from "react"

export type ButtonProps = {
    onClick?: () => void
    className?: string
    theme?: "primary" | "secondary" | "red" | "green" | "cms" | "overlay"
    icon?: React.JSX.Element
    text?: string
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    leftIcon?: boolean
    title?: string
}

export default function Button(
    { onClick, className, theme = "primary", text, icon, disabled = false, type = "button", leftIcon = false, title }: ButtonProps
) {
    let colorClass: string

    switch (theme) {
        case "primary": {
            colorClass = "bg-primary bg-opacity-60 disabled:bg-opacity-30 disabled:hover:bg-opacity-30"
            break
        }
        case "secondary": {
            colorClass = "bg-secondary bg-opacity-30 disabled:bg-opacity-15 disabled:hover:bg-opacity-15"
            break
        }
        case "red": {
            colorClass = "bg-red-500 bg-opacity-40 disabled:bg-opacity-20 disabled:hover:bg-opacity-20"
            break
        }
        case "green": {
            colorClass = "bg-green-500 bg-opacity-40 disabled:bg-opacity-20 disabled:hover:bg-opacity-20"
            break
        }
        case "overlay": {
            colorClass = "bg-black bg-opacity-10 disabled:bg-opacity-5 disabled:hover:bg-opacity-5 text-white"
            break
        }
        case "cms": {
            colorClass = "bg-maintainer bg-opacity-40 border-2 border-dashed border-black disabled:bg-opacity-20 disabled:hover:bg-opacity-20"
        }
    }


    let alignmentClass: string
    if (icon) {
        if (text) {
            // Text & Icon
            alignmentClass = leftIcon? "pr-5 pl-3 py-2 justify-between" : "pl-5 pr-3 py-2 justify-between"
        } else {
            // No Text & Icon
            alignmentClass = "p-2 justify-center"
        }
    } else {
        if (!text) {  // No Text & No Icon
            text = "Default Button"
        }
        // Text & No Icon
        alignmentClass = "px-5 py-2 justify-center"
    }

    return (
        <div className={`rounded-full ${!(theme === "overlay") && 'bg-white'} shrink-0 grow-0 w-max h-max`}>
            <button
                type={type}
                disabled={disabled}
                onClick={onClick}
                title={title}
                className={`${colorClass} ${className} font-medium w-auto rounded-full group gap-x-3 drop-shadow-md
                flex ${leftIcon? "flex-row-reverse" : "flex-row"} items-center ${alignmentClass} flex-grow
                hover:text-white ${theme === "overlay"? 'hover:bg-opacity-30' : 'hover:bg-opacity-100'} 
                hover:drop-shadow-xl transition
                disabled:drop-shadow-none disabled:hover:drop-shadow-none disabled:cursor-not-allowed
                disabled:text-gray-400 disabled:hover:text-gray-400 
                h-[33px] sm:h-[35px] md:h-[37px]
            `}>
                {text &&
                    <p className={"text-[12px] sm:text-[13px] md:text-[14px]"}>
                        {text}
                    </p>
                }
                {icon &&
                    <div className={`h-full w-auto grow-0
                        ${leftIcon? `group-hover:rotate-[-12deg]` : `group-hover:rotate-[12deg]`} 
                        group-disabled:group-hover:rotate-0 transition ease-in-out
                    `}>
                        {icon}
                    </div>
                }
            </button>
        </div>

    )
}