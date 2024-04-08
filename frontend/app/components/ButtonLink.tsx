import React from "react";
import Link from "next/link";

export default function ButtonLink ({ href, text = "Button", className }: { href: string, text: string, className?: string }): React.JSX.Element {
    return (
        <Link href={href} className={"button px-4 py-2 w-48"}>
            <span className={"block"}>{text}</span>
        </Link>
    )
}