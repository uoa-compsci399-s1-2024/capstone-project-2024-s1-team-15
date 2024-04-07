import React from "react";
import Link from "next/link";

export default function ButtonLink ({ href, text = "Button", className }: { href: string, text: string, className?: string }): React.JSX.Element {
    return (
        <Link href={href} className={"flex items-center justify-center bg-green-600 font-medium rounded-full text-sm transition-all bg-opacity-15 text-black hover:bg-opacity-100 hover:text-white px-4 py-2 w-48"}>
            <span className={"block"}>{text}</span>
        </Link>
    )
}