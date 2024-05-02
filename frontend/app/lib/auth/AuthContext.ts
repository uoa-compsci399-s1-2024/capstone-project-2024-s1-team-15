import { IUser } from "@aapc/types";
import { AuthResponse, Nullable } from "@/app/lib/types";
import React from "react";

export interface IAuthContext {
    user: Nullable<IUser>
    token: Nullable<string>
    setSession: (session: AuthResponse) => void
    clearSession: () => void
}

const AuthContext = React.createContext<IAuthContext>({
    user: null,
    token: null,
    setSession: (_) => {},
    clearSession: () => {}
})

export default AuthContext
