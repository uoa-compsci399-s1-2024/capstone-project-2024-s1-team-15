"use client"

import React from "react"
import { redirect, useSearchParams } from "next/navigation"
import { useAuth } from "@/app/lib/hooks"
import { LoginForm } from "@/app/(auth)/components"
import { Nullable } from "@/app/lib/types"

export default function Login() {
    const { token } = useAuth()

    const searchParams = useSearchParams()

    if (token) {
        const fromPathParam = searchParams.get("from")
        let fromPath: Nullable<string>
        try {
            fromPath = fromPathParam ? atob(fromPathParam) : null
        } catch (e) {
            fromPath = null
        }
        if (!fromPath) {
            redirect("/")
        } else {
            redirect(fromPath)
        }
    }

    return (
        <>
            <h1>Login</h1>
            <LoginForm/>
        </>
    )
}
