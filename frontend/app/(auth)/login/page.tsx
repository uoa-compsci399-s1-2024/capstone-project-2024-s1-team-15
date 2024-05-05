"use client"

import React, { Suspense } from "react"
import { redirect, useSearchParams } from "next/navigation"
import { useAuth } from "@/app/lib/hooks"
import { LoginForm } from "@/app/(auth)/components"
import { Nullable } from "@/app/lib/types";

export default function Login() {
    const { token } = useAuth()

    const searchParams = useSearchParams()
    const errorMessageParam = searchParams.get("msg")

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

    let errorMessage: Nullable<string>
    try {
        errorMessage = errorMessageParam ? atob(errorMessageParam) : null
    } catch (e) {
        errorMessage = null
    }

    return (
        <Suspense>
            { errorMessage && <span className={"form-error mb-4 block"}>{errorMessage}</span> }
            <LoginForm/>
        </Suspense>
    )
}
