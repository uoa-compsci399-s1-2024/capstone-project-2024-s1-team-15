"use client"

import React from "react"
import Button from "@/app/components/Button"

type ExternalLinkButtonProps = {
    url: string
    text: string
}

export default function ExternalLinkButton({url, text} : ExternalLinkButtonProps){
    const handleClick = () => {
        window.open(url, "_blank")
    }

    return (
        <Button className={"min-w-48"} onClick={handleClick} text={text}/>
    )
}
