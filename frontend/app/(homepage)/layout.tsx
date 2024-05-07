import React from "react"
import { getMetadata } from "@/app/lib/util"

export const metadata = getMetadata()

export default function HomepageLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
}
