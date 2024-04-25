import type { Metadata } from "next"
import { getMetadata } from "@/app/util"
import React from "react"

export const metadata: Metadata = getMetadata("Edit Research")

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
}
