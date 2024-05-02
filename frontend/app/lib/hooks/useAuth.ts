"use client"

import { IUser, User } from "@aapc/types";
import useLocalStorage from "@/app/lib/hooks/useLocalStorage";
import { AuthResponse, Nullable } from "@/app/lib/types";
import { useContext } from "react";
import AuthContext from "@/app/lib/auth/AuthContext";

export default function useAuth() {
    const [lsUser, setLSUser] = useLocalStorage("currentUser", null)
    const [lsToken, setLSToken] = useLocalStorage("currentToken", null)
    const authContext = useContext(AuthContext)

    const setSession = (r: AuthResponse) => {
        setLSUser(JSON.stringify(r.user))
        setLSToken(JSON.stringify(r.token))
        authContext.setSession(r)
    }

    const clearSession = () => {
        setLSUser(null)
        setLSToken(null)
        authContext.clearSession()
    }

    let user: Nullable<IUser> = lsUser ? new User(JSON.parse(lsUser)) : null
    let token: Nullable<string> = lsToken

    return { user, token, setSession, clearSession }
}
