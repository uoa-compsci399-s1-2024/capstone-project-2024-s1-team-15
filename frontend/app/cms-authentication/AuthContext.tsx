import React, { useContext, useState, useEffect } from "react"

import { redirect } from "next/navigation"
import { API_URI, OPEN_AUTH_ROUTES, ROUTES } from "@/app/consts"
import { User } from "@aapc/types"

type AuthContextValue = {
    currentUser: null | (User & { token: string })
    login: any
    logout: any
}

const AuthContext = React.createContext({
    currentUser: null,
    login: () => {},
} as AuthContextValue)

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }: React.PropsWithChildren) {
    const [currentUser, setCurrentUser] = useState(null as AuthContextValue["currentUser"])
    const [loading, setLoading] = useState(true)

    // remember previously logged in user
    useEffect(() => {
        let currentUser
        try {
            currentUser = JSON.parse(localStorage.getItem("user") || "null")
        } catch (e) {
            currentUser = null
        }
        setCurrentUser(currentUser)
        setLoading(false)
    }, [])

    // remember this login/logout & redirect if necessary
    useEffect(() => {
        if (loading) return // auth changes are still happening so wait

        localStorage.setItem("user", JSON.stringify(currentUser))

        const currentRoute = window.location.pathname

        if (currentUser && OPEN_AUTH_ROUTES.includes(currentRoute)) redirect(ROUTES.REDIRECT_AFTER_LOGIN)
    }, [currentUser, loading])

    // returns the error if there is one
    // if login successful, returns void but sets the current user
    async function login(email: string, password: string) {
        try {
            const credentialsJson = JSON.stringify({ username: email, password })
            const authResponse = await fetch(`${API_URI}/auth/login`, {
                method: "POST",
                body: credentialsJson,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })

            if (authResponse.status != 200) throw Error((await authResponse.json()).message)

            const authJson = (await authResponse.json()) as { token: string; user: object }
            const userReconstructed = new User(authJson.user)
            setCurrentUser({ token: authJson.token, ...userReconstructed })
        } catch (error: any) {
            console.error("Login failed:", { error })
            return error.message
        }
    }

    function logout() {
        setCurrentUser(null)
    }

    // expose useful auth methods/values
    const authDetails = {
        currentUser,
        login,
        logout,
    }
    return <AuthContext.Provider value={authDetails}>{!loading && children}</AuthContext.Provider>
}
