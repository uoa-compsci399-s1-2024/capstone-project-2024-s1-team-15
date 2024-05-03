"use client"

import React from "react"
import { AuthProvider } from "@/app/(auth)/components"

export default function AuthLayout ({ children }: React.PropsWithChildren) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}
