"use client"

import React from "react"
import { SCOPES } from "@/app/lib/consts"
import { withPrivilege } from "@/app/lib/hoc"

export default function CMSLayout({ children }: { children: React.ReactNode }) {
    return withPrivilege(SCOPES.maintainer, (
        <>
            {children}
        </>
    ))
}
