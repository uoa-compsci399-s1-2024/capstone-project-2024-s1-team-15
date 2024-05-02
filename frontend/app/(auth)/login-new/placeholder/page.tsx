"use client"

import React from "react"
import { useAuth } from "@/app/lib/hooks"

export default function Placeholder (): React.JSX.Element {
    const { user, clearSession } = useAuth()

    return (
        <>
            {user && user.displayName}
            <button className={"button"} onClick={() => clearSession()}>log out</button>
        </>
    )
}