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

export default function Button({
    onClick,
    className,
    theme = "primary",
    text,
    icon,
    disabled = false,
    type = "button",
    leftIcon = false,
    title,
}: ButtonProps) {
    let colorClass: string

    switch (theme) {
        case "primary": {
            colorClass = "bg-primary bg-opacity-60 disabled:bg-opacity-30 disabled:group-hover:bg-opacity-30"
            break
        }
        case "secondary": {
            colorClass = "bg-secondary bg-opacity-30 disabled:bg-opacity-15 disabled:group-hover:bg-opacity-15"
            break
        }
        case "red": {
            colorClass = "bg-red-500 bg-opacity-40 disabled:bg-opacity-20 disabled:group-hover:bg-opacity-20"
            break
        }
        case "green": {
            colorClass = "bg-green-500 bg-opacity-40 disabled:bg-opacity-20 disabled:group-hover:bg-opacity-20"
            break
        }
        case "overlay": {
            colorClass = "bg-black bg-opacity-10 disabled:bg-opacity-5 disabled:group-hover:bg-opacity-5 text-white"
            break
        }
        case "cms": {
            colorClass =
                "bg-maintainer bg-opacity-40 border-2 border-dashed border-black disabled:bg-opacity-20 disabled:group-hover:bg-opacity-20"
        }
    }

    let alignmentClass: string
    if (icon) {
        if (text) {
            // Text & Icon
            alignmentClass = leftIcon ? "pr-5 pl-3 py-2 justify-between" : "pl-5 pr-3 py-2 justify-between"
        } else {
            // No Text & Icon
            alignmentClass = "p-2 justify-center"
        }
    } else {
        if (!text) {
            // No Text & No Icon
            text = "Default Button"
        }
        // Text & No Icon
        alignmentClass = "px-5 py-2 justify-center"
    }

    return (
        <div
            className={`group shrink-0 grow-0 w-max  rounded-full ${!(theme === "overlay") && "bg-white"}
            ${disabled ? "shadow-none hover:shadow-none" : "shadow-md hover:shadow-lg"} transition
        `}>
            <button
                type={type}
                disabled={disabled}
                onClick={onClick}
                title={title}
                className={`${colorClass} ${className} font-medium w-auto rounded-full gap-x-3 shadow-none
                flex ${leftIcon ? "flex-row-reverse" : "flex-row"} items-center ${alignmentClass} flex-grow
                group-hover:text-white ${theme === "overlay" ? "group-hover:bg-opacity-30" : "group-hover:bg-opacity-100"}
                group-hover:shadow-none transition
                disabled:cursor-not-allowed
                disabled:text-gray-400 disabled:group-hover:text-gray-400
                h-full
                w-[33px] sm:w-[35px] md:w-[37px]
                `}>
                {text && <p className={"text-[12px] sm:text-[13px] md:text-[14px]"}>{text}</p>}
                {icon && (
                    <div
                        className={`object-contain 
                        aspect-square grow-0
                        ${
                            disabled
                                ? "group-hover:rotate-0"
                                : leftIcon
                                  ? `group-hover:rotate-[-10deg]`
                                  : `group-hover:rotate-[10deg]`
                        } 
                        transition-transform ease-in-out
                    `}>
                        {icon}
                    </div>
                )}
            </button>
        </div>
    )
}
