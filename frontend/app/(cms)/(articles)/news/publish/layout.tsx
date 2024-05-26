import type { Metadata } from "next"
import { getMetadata } from "@/app/lib/util"
import React from "react"
import { withPrivilege } from "@/app/lib/hoc";
import { SCOPES } from "@/app/lib/consts";

export const metadata: Metadata = getMetadata("Publish News")

export default function Layout({ children }: { children: React.ReactNode }) {
    return withPrivilege(SCOPES.loggedIn, (
        <>
            {children}
        </>
    ))
}
