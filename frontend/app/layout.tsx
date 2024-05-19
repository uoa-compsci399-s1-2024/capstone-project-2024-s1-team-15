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
            <body className={`${inter.variable} font-sans h-screen`}>
                <AuthLayout>
                    <div className="relative h-full flex flex-col">
                        <Header />
                        <div className="fixed top-28 pt-5 right-0">
                            <FlowerNav />
                        </div>
                        <div className={`max-w-full flex-1 pl-4 pr-80 flex justify-between flex-col `}>
                            <div>{children}</div>
                            <Copyright />
                        </div>
                    </div>
                </AuthLayout>
            </body>
        </html>
    )
}
