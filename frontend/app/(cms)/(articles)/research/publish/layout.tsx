import type { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"
import React from "react"

export const metadata: Metadata = getMetadata("Publish Research")

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
}
