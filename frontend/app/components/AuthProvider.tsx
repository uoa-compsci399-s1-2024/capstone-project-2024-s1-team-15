import React from "react";
import AuthContext from "@/app/lib/auth/AuthContext";
import { useAuth } from "@/app/lib/hooks";

export default function AuthProvider({ children }: React.PropsWithChildren): React.JSX.Element {
    const { user, token, setSession, clearSession } = useAuth()

    return (
        <AuthContext.Provider value={{ user, token, setSession, clearSession }}>
            { children }
        </AuthContext.Provider>
    )
}