"use client"

import React, { useEffect } from "react"
import { redirect } from "next/navigation"
import { useAuth } from "@/app/lib/hooks"
import { LoginForm } from "@/app/(auth)/components"
import { Nullable } from "@/app/lib/types"
import MessageFromQuery from "@/app/components/MessageFromQuery";

export default function Login() {
    const { token } = useAuth()

    useEffect(() => {
        if (token) {
            const params = (new URL(window.location.href)).searchParams
            const fromPathParam = params.get("from")
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
    }, [token])

    return (
        <>
            <MessageFromQuery/>
            <h1 className={"page-title"}>Login</h1>
            <LoginForm/>
        </>
    )
}
