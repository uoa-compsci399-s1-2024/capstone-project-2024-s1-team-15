import "./globals.css"
import React from "react"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import FlowerNav from "./components/flowerNav"
import localFont from "next/font/local"
import type { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"
import { AuthLayout } from "@/app/(auth)/components"

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
                    <div className="relative">
                        <Header />
                        <div className="fixed top-30 pt-5 right-0">
                            <FlowerNav />
                        </div>
                        <div className={`max-w-full pl-4 pb-12 pr-80`}>{children}</div>
                    </div>
                    <Footer />
                </AuthLayout>
            </body>
        </html>
    )
}
