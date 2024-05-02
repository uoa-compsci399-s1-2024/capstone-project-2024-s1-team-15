"use client"

import React from "react"
import LoginForm from "@/app/(auth)/login-new/LoginForm"
import ButtonLink from "@/app/components/ButtonLink"

export default function Login() {
    return (
        <>
            <LoginForm/>
            <ButtonLink href={"/login-new/placeholder"} text={"test"}/>
        </>
    )
}
