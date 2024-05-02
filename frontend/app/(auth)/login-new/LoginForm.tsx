"use client"

import React, { useContext } from "react";
import { useFormStatus, useFormState } from "react-dom"
import { FormState } from "@/app/lib/types"
import { login } from "@/app/lib/auth/services"
import AuthContext from "@/app/lib/auth/AuthContext";

export default function LoginForm (): React.JSX.Element {
    const [ state, formAction ] = useFormState<FormState>(loginFormAction, {})
    const { pending } = useFormStatus()
    const { setSession, user } = useContext(AuthContext)

    async function loginFormAction(_: FormState, formData?: any): Promise<FormState> {
        const username = formData.get("username")
        const password = formData.get("password")
        if (!username || !password) {
            return { isValidInput: false }
        }
        let loginResults = await login({ username, password })
        if (loginResults.success) {
            setSession(loginResults.result)
        } else {
            return { error: loginResults.message }
        }
        return {}
    }

    return (
        <form className="flex flex-col items-start gap-4" action={formAction}>
            <label>
                <span className="form-label">Username</span>
                <input id={"username"} name={"username"} className={"form-input"} type={"text"} />
            </label>
            <label>
                <span className="form-label">Password</span>
                <input id={"password"} name={"password"} className={"form-input"} type={"password"}/>
            </label>
            <button disabled={pending} type={"submit"} className="button">
                {pending ? "Logging in..." : "Log in"}
            </button>
            {state.isValidInput === false && <span>Enter both username and password.</span>}
            {state.error && <span>{state.error}</span>}
            {user && <span>{user.username}</span>}
        </form>
    )
}
