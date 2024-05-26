import type { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"
import React from "react"

export const metadata: Metadata = getMetadata("Publish News")

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    )
}
