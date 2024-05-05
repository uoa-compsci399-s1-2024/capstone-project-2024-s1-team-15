"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/lib/hooks";
import { AuthDashboard } from "@/app/(auth)/components"

export default function Nav(): React.JSX.Element {
    const pathname = usePathname()
    const { token } = useAuth();

    return (
        <nav>
            <div className={`fixed h-28 w-full flex justify-between items-center z-50 bg-gradient-to-b from-white`}>
                <div className={"pl-20"}>
                    <span className={"font-bold text-5xl text-black tracking-tight"}>
                        <Link href={"/"} className="text-black">
                            AAPC    
                        </Link>
                    </span>
                </div>
                <div className={"pr-20"}>
                {!token && (
                    <Link href={`/login?from=${btoa(pathname)}`}>
                    <button
                        className="hoverable login-button"
                        style={{ backgroundColor: '#FFD166', }}>
                        Log in
                    </button>
                    </Link> )}
                    <AuthDashboard/>
                </div>
            </div>
            <div className={`h-28`}></div>
        </nav>
    );
}
