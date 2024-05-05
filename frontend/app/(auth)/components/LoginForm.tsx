"use client"

import React from "react"
import { useFormStatus, useFormState } from "react-dom"
import { FormState } from "@/app/lib/types"
import { login } from "@/app/services/auth"
import { useAuth } from "@/app/lib/hooks"
import Link from "next/link"

export default function LoginForm (): React.JSX.Element {
    const [ state, formAction ] = useFormState<FormState>(loginFormAction, {})
    const { pending } = useFormStatus()
    const { setSession } = useAuth()

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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg w-full max-w-md p-8 modal-content z-50"
                style={{ 
                    backgroundColor: '#FFD166',
                }}>
                <div className="flex justify-end">
                <Link href={"/"}>
                    <span
                        className="exit-button">
                        &times;
                    </span>
                    </Link>
                </div>

                <h2 className="text-center mb-4 font-bold text-2xl">Log in</h2>
                <label>
                    <span className="form-label">Username</span>
                    <input 
                        id={"username"} 
                        name={"username"} 
                        className={"form-input"} 
                        type={"text"} 
                        placeholder={"Enter your email"}
                        style={{backgroundColor: '#FAFAF4'}}/>
                </label>
                <div className="pt-2"></div>
                <label>
                    <span className="form-label">Password</span>
                    <input 
                    id={"password"} 
                    name={"password"} 
                    className={"form-input"} 
                    type={"password"}
                    placeholder={"Enter your password"}
                    style={{backgroundColor: '#FAFAF4'}}/>
                </label>
                <div className="pt-2"></div>
                <button 
                    disabled={pending} 
                    type={"submit"} 
                    className="button hoverable w-full mt-4 hover:text-black mb-2"
                    style={{
                        backgroundColor: '#fff0ce',
                        }}>
                    {pending ? "Logging in..." : "Log in"}
                </button>
            
            {state.isValidInput === false && <span className="text-red-500 font-medium">Enter both username and password.</span>}
            {state.error && <p className={"form-error"}>{state.error}</p>}
        </div>
        </div>
        </form>
    )
}