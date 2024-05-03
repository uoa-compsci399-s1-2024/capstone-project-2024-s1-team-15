"use client"

import React from "react"
import withPrivilege from "@/app/lib/hoc/withPrivilege"
import { SCOPES } from "@/app/lib/consts"

export default function CMSLayout({ children }: { children: React.ReactNode }) {
    return withPrivilege(SCOPES.maintainer, (
        <>
            {children}
        </>
    ))
}
