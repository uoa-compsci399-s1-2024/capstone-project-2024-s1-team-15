"use client"

import React from "react"
import { useFormStatus, useFormState } from "react-dom"
import { login } from "@/app/services/auth"
import { useAuth } from "@/app/lib/hooks"

type FormState = {
    error?: string
}

export default function LoginForm ({ closeModal }: { closeModal?: () => void }): React.JSX.Element {
    const [ state, formAction ] = useFormState<FormState>(loginFormAction, {})
    const { pending } = useFormStatus()
    const { setSession } = useAuth()

    async function loginFormAction(_: FormState, formData?: any): Promise<FormState> {
        const username = formData.get("username")
        const password = formData.get("password")
        if (!username || !password) {
            return { error: "Both username and password are required." }
        }
        let loginResults = await login({ username, password })
        if (loginResults.success) {
            closeModal && closeModal();
            (() => {
                const formElement = document.getElementById("login-form") as HTMLFormElement
                formElement.reset()
            })();
            setSession(loginResults.result)

        } else {
            return { error: loginResults.message }
        }
        return {}
    }

    return (
        <form className="flex flex-col items-start space-y-6 w-full" action={formAction} id={"login-form"}>
            <div className={"w-full"}>
                <label><p className="form-label">Username</p></label>
                <input name={"username"} className={"form-input bg-gray-100 max-w-lg"} type={"text"}
                       placeholder={"Enter your username..."}/>
            </div>

            <div className={"w-full"}>
                <label><p className="form-label">Password</p></label>
                <input name={"password"} className={"form-input bg-gray-100 max-w-lg"} type={"password"}
                       placeholder={"Enter your password..."}/>
            </div>
            {state.error && <p className={"form-error ml-1"}>{state.error}</p>}
            <button disabled={pending} type={"submit"} className="button">
                {pending ? "Logging in..." : "Login"}
            </button>
        </form>
    )
}