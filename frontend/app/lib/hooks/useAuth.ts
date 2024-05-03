"use client"

import { IUser } from "@aapc/types";
import { AuthResponse, Nullable } from "@/app/lib/types";
import React, { useContext } from "react"

interface IAuthContext {
    user: Nullable<IUser>
    token: Nullable<string>
    setSession: (session: AuthResponse) => void
    clearSession: () => void
}

export const AuthContext = React.createContext<IAuthContext>({
    user: null,
    token: null,
    setSession: (_) => {},
    clearSession: () => {}
})

export default function useAuth() {
    return useContext(AuthContext)
}
