import React from "react"
import Link from "next/link"

type ButtonLinkProps = {
    href: string
    text: string
}

export default function ButtonLink({ href, text = "Button" }: ButtonLinkProps ): React.JSX.Element {
    return (
        <Link href={href} className={"button w-48"}>
            <span className={"block"}>{text}</span>
        </Link>
    )
}
