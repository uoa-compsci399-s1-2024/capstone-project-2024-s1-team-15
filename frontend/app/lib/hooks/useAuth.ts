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

// export default function useAuth() {
//     const [lsUser, setLSUser] = useLocalStorage("currentUser", null)
//     const [lsToken, setLSToken] = useLocalStorage("currentToken", null)
//     const authContext = useContext(AuthContext)
//
//     const setSession = (r: AuthResponse) => {
//         setLSUser(JSON.stringify(r.user))
//         setLSToken(JSON.stringify(r.token))
//         authContext.setSession(r)
//     }
//
//     const clearSession = () => {
//         setLSUser(null)
//         setLSToken(null)
//         authContext.clearSession()
//     }
//
//     return { setSession, clearSession }
// }
