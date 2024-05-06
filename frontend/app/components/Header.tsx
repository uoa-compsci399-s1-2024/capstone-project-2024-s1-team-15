import React from "react"
import Link from "next/link"
import { AuthDashboard } from "@/app/(auth)/components"

export default function Nav(): React.JSX.Element {
    return (
        <header>
            <div className={`fixed h-28 w-full flex justify-between items-center z-30 bg-gradient-to-b from-white`}>
                <div className={"px-20"}>
                    <span className={"font-bold text-5xl text-black tracking-tight"}>
                        <Link href={"/"} className="text-black">
                            AAPC
                        </Link>
                    </span>
                </div>
                <div className={"px-20"}>
                    <AuthDashboard />
                </div>
            </div>
            <div className={`h-28`}></div>
        </header>
    )
}
