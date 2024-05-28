"use client"

import React, { useEffect, useState } from "react"
import { useLocalStorage } from "@/app/lib/hooks"
import { AuthResponse, Nullable } from "@/app/lib/types"
import { IUser, User } from "@aapc/types"
import { AuthContext } from "@/app/lib/hooks/useAuth"
import { refreshToken } from "@/app/services/auth";

const getUserFromString = (usr: Nullable<string>): Nullable<IUser> => {
    return usr !== null ? new User(JSON.parse(usr)) : null
}

export default function AuthProvider({ children }: React.PropsWithChildren): React.JSX.Element {
    const [lsUser, setLSUser] = useLocalStorage("currentUser", null)
    const [token, setToken] = useLocalStorage("currentToken", null)
    const [user, setUser] = useState<Nullable<IUser>>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    useEffect(() => {
        setUser(getUserFromString(lsUser))
    }, [lsUser])

    const setSession = (authResponse: AuthResponse) => {
        setLSUser(JSON.stringify(authResponse.user))
        setToken(authResponse.token)
    }

    const clearSession = () => {
        setLSUser(null)
        setToken(null)
    }

    const refreshSession = () => {
        refreshToken({ token }).then(r => {
            if (r.success) {
                setSession(r.result)
            }
        })
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, setSession, refreshSession, clearSession }}>
            { children }
        </AuthContext.Provider>
    )
}
