"use client"

import React, { useState } from "react"
import Link from "next/link"
import { AuthDashboard } from "@/app/(auth)/components"

import FlowerNav from "./flowerNav"

export default function Header(): React.JSX.Element {
    const [showsNav, setShowsNav] = useState(false)

    return (
        <header className="h-28">
            <div className="fixed h-28 px-4 z-30 w-full flex justify-between items-center bg-gradient-to-b from-white">
                <Link href="/" className="font-bold text-5xl text-black tracking-tight">
                    AAPC
                </Link>

                <div className="flex items-center gap-4">
                    <AuthDashboard />

                    <div className="block md:hidden">
                        <div className="cursor-pointer" onClick={() => setShowsNav((curr) => !curr)}>
                            {showsNav ? <CloseIcon /> : <MenuIcon />}
                        </div>

                        <div className={`${showsNav ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all`}>
                            {showsNav && <FlowerNav />}

                            {/* clicking on this closes the nav 👇 */}
                            <div
                                className="absolute -z-10 top-0 left-0 h-screen w-screen bg-black opacity-35 cursor-pointer"
                                onClick={() => setShowsNav(false)}></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

function MenuIcon() {
    return (
        <div className="flex flex-col gap-[4px] w-8 ">
            <div className="w-full h-[0.3rem] bg-black rounded-full" />
            <div className="w-full h-[0.3rem] bg-black rounded-full" />
            <div className="w-full h-[0.3rem] bg-black rounded-full" />
        </div>
    )
}

function CloseIcon() {
    return (
        <>
            <div className="w-8 h-[0.3rem] bg-black rounded-full origin-center rotate-45" />
            <div className="w-8 h-[0.3rem] relative top-[-0.3rem] bg-black rounded-full origin-center -rotate-45" />
        </>
    )
}
