import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import React from "react";
import Nav from "@/app/components/Nav";
import { WEBSITE_NAME } from "@/app/consts";
import { getMetadata } from "@/app/util";

const inter = localFont({
    src: './public/Inter.ttf',
    display: 'swap',
    variable: "--font-inter"
})

export const metadata: Metadata = getMetadata()

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${inter.variable} font-sans`}>
            <Nav/>
            <div className={"w-[900px] px-6 mx-auto pb-12"}>
                {children}
            </div>
        </body>
        </html>
    )
}
