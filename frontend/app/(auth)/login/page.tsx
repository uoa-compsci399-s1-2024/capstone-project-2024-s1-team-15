"use client"

import { useAuth } from "@/app/(auth)/CMSAuthContext"
import React, { useState } from "react"
import Link from "next/link"

export default function Login() {
    const { login } = useAuth()
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg w-full max-w-md p-8 modal-content z-50"
                style={{ 
                    backgroundColor: '#FFD166',
                }}>
                <div className="flex justify-end">
                < Link href={"/"}>
                    <span
                        className="exit-button">
                        &times;
                    </span>

                </Link>
                </div>
                <h2 className="text-center mb-4 font-bold text-2xl">Log in</h2>
                <form>
                    <label>
                        <span className="form-label">Email</span>
                        <input
                            className="form-input" placeholder="Enter your email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            type="text"
                            style={{backgroundColor: '#FAFAF4'
                            }}
                        />
                    </label>

                    <label>
                        <span className="form-label">Password</span>
                        <input
                            className="form-input"
                            placeholder="Enter your password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            type="password"
                            style={{backgroundColor: '#FAFAF4'}}
                        />
                    </label>

                    <button
                        className="button hoverable w-full mt-4 hover:text-black"
                        style={{
                            backgroundColor: '#fff0ce',
                        }}
                        onClick={(e) => {
                            e.preventDefault()

                            setErrorMessage(login(emailInput, passwordInput)) // login returns undefined or error message
                        }}>
                        Login
                    </button>
                    {errorMessage && <p className="form-error">{errorMessage}</p>}
                </form>
            </div>
        </div>
    )
}
