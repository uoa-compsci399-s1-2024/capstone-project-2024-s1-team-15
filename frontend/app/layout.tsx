import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import React from "react"
import Header from "@/app/components/Header"
import { getMetadata } from "@/app/util"
import Footer from "@/app/components/Footer"
import AuthLayout from "@/app/components/AuthLayout"
import FlowerNav from "./components/flowerNav"

const inter = localFont({
    src: "./public/Inter.ttf",
    display: "swap",
    variable: "--font-inter",
})

export const metadata: Metadata = getMetadata()

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans`}>
                <AuthLayout>
                    <Header />
                    <div className="flex">
                        <div className={"max-w-[calc(100%-18rem)] flex-1 px-20 pb-12"}>{children}</div>
                        <FlowerNav />
                    </div>
                    <Footer />
                </AuthLayout>
            </body>
        </html>
    )
}
