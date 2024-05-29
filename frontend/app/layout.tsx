import "./globals.css"
import React from "react"
import type { Metadata } from "next"
import Header from "@/app/components/Header"
import FlowerNav from "@/app/components/flowerNav"
import localFont from "next/font/local"
import { getMetadata } from "@/app/lib/util"
import { AuthLayout } from "@/app/(auth)/components"
import Copyright from "@/app/components/Copyright"

const inter = localFont({
    src: "./public/Inter.ttf",
    display: "swap",
    variable: "--font-inter",
})

export const metadata: Metadata = getMetadata()

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans max-w-screen min-h-screen flex flex-col overflow-x-hidden`}>
                <AuthLayout>
                    {/* Header */}
                    <header className={`w-screen
                        h-header-mobile pb-2
                        sm:h-header-tablet sm:pb-4
                        md:h-header-desktop md:pb-6
                    `}>
                        <Header/>
                    </header>

                    <div className="relative">
                        {/* Flower Nav - Only shown on desktop, desktop wide, desktop ultra-wide viewports */}
                        <nav className="fixed right-0 hidden lg:block z-30">
                            <FlowerNav/>
                        </nav>

                        {/* Main Content */}
                        <main className={`max-w-screen xl:max-w-content-max px-pc flex justify-between flex-col
                            sm:px-pc-sm
                            md:px-pc-md
                            lg:mr-nav
                            xl:ml-auto
                            2xl:mx-auto
                        `}>
                            {children}
                        </main>
                    </div>

                    {/* Footer */}
                    <footer className={"mt-auto"}>
                        <div className={`mt-2 sm:mt-4 md:mt-8`}>
                            <Copyright/>
                        </div>
                    </footer>
                </AuthLayout>
            </body>
        </html>
    )
}
