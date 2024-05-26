"use client"

import React from "react"
import { withPrivilege } from "@/app/lib/hoc";
import { SCOPES } from "@/app/lib/consts";

export default function Layout({ children }: { children: React.ReactNode }) {
    return withPrivilege(SCOPES.loggedIn, (
        <>
            {children}
        </>
    ))
}
