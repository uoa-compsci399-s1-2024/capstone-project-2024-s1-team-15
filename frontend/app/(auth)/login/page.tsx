"use client"

import React, { useEffect, useState } from "react"
import LoginForm from "@/app/(auth)/components/LoginForm"
import { useAuth } from "@/app/lib/hooks"
import { verifyJwt } from "@/app/lib/auth/crypto"
import { JWTPayload, Nullable } from "@/app/lib/types"

export default function Login() {
    const { token } = useAuth()
    const [verified, setVerified] = useState<Nullable<JWTPayload>>(null)

    useEffect(() => {
        if (!token) return
        verifyJwt(token).then((r) => {
            setVerified(r)
        })
    }, [token])

    return (
        <>
            <h1>Log in</h1>
            <LoginForm/>
        </>
    )
}
