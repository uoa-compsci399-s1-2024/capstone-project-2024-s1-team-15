import React from "react";
import Link from "next/link";

export default function Nav (): React.JSX.Element {
    return (
        <div>
            <nav className={`fixed h-20 w-full bg-amber-200 flex`}>
                <Link href={"/"} className={"border-dotted p-4 border-black border-2"}>Homepage</Link>
                <Link href={"/about"} className={"border-dotted p-4 border-black border-2"}>About</Link>
            </nav>
            <div className={`h-20`}></div>
        </div>
    )
}