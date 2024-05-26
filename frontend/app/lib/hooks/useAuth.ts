"use client"

import { IUser } from "@aapc/types";
import { AuthResponse, Nullable } from "@/app/lib/types";
import React, { useContext } from "react"

interface IAuthContext {
    user: Nullable<IUser>
    token: Nullable<string>
    loading: boolean
    setSession: (session: AuthResponse) => void
    refreshSession: () => void
    clearSession: () => void
}

export const AuthContext = React.createContext<IAuthContext>({
    user: null,
    token: null,
    loading: true,
    setSession: (_) => {},
    refreshSession: () => {},
    clearSession: () => {}
})

export default function useAuth() {
    return useContext(AuthContext)
}
