import "./globals.css"
import React from "react"
import localFont from "next/font/local"
import type { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"
import { AuthLayout } from "@/app/(auth)/components"
import Nav from "@/app/components/Nav"
import Footer from "@/app/components/Footer"

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
                    <Nav/>
                    <div className={"w-[900px] px-6 mx-auto pb-12"}>
                        {children}
                    </div>
                    <Footer/>
                </AuthLayout>
            </body>
        </html>
    )
}
