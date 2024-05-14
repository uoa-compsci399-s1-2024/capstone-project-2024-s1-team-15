"use client"
import React from "react"


type ExternalLinkButtonProps = {
    url: string
    text: string
}


export default function ExternalLinkButton({url, text} : ExternalLinkButtonProps){

    const handleClick = () => {
        window.open(url, "_blank")
    }

    return(
        <button className={"button w-48"} onClick={handleClick}>
            {text}
        </button>
    )
}

