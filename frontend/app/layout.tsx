import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import React, { Suspense } from "react"
import Nav from "@/app/components/Nav"
import { getMetadata } from "@/app/lib/util"
import Footer from "@/app/components/Footer"
import { AuthLayout } from "@/app/(auth)/components"
import MessageFromQuery from "@/app/components/MessageFromQuery";

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
                        <Suspense>
                            <MessageFromQuery/>
                        </Suspense>
                        {children}
                    </div>
                    <Footer/>
                </AuthLayout>
            </body>
        </html>
    )
}
