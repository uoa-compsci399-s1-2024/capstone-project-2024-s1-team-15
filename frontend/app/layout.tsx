import "./globals.css"
import React from "react"
import Header from "@/app/components/Header"
import FlowerNav from "./components/flowerNav"
import localFont from "next/font/local"
import type { Metadata } from "next"
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
            <body className={`${inter.variable} font-sans max-w-screen`}>
                <AuthLayout>
                    <header className={"h-header-mobile mb-2 sm:h-header-tablet sm:mb-4 md:h-header-desktop md:mb-6"}>
                        <Header/>
                    </header>

                    <div className="relative">
                        <nav className="fixed pt-5 right-0 lg:block hidden">
                            <FlowerNav/>
                        </nav>

                        <main className={`max-w-screen xl:max-w-content-max px-3 sm:px-4 md:px-5 lg:mr-nav lg:px-6 xl:ml-auto 2xl:mx-auto flex justify-between flex-col`}>
                            {children}
                        </main>
                    </div>

                    <footer>
                        <Copyright/>
                    </footer>
                </AuthLayout>
            </body>
        </html>
    )
}
