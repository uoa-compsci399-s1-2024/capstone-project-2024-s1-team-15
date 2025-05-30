"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Nullable } from "@/app/lib/types"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import { confirmRegister } from "@/app/services/auth"
import ConfirmationCodeInput from "@/app/components/ConfirmationCodeInput"

export default function SignupConfirm() {
    const [username, setUsername] = useState<Nullable<string>>(null)
    const [isValidCode, setIsValidCode] = useState(false)
    const [pending, setPending] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<Nullable<string>>(null)
    const router = useRouter()

    useEffect(() => {
        const params = (new URL(window.location.href)).searchParams
        const username = params.get("u")
        if (!username) router.push(`/signup`)
        setUsername(username)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitConfirmSignup = async (formData: FormData) => {
        const code = formData.get("code")
        if (!formData.get("code")) {
            return
        }
        setPending(true)
        const r = await confirmRegister({
            username: String(username),
            confirmationCode: String(code)
        })
        if (r.success) {
            setPending(false)
            setSuccess(true)
            setError(null)
            setTimeout(() => {
                router.push(`/login`)
            }, 2500)
        } else {
            setPending(false)
            setError(r.message)
        }
    }

    return (
        <div>
            <h1 className={"page-title"}>Sign up</h1>
            <p className={"text-green-500 my-4 smaller"}>
                We&apos;ve sent a confirmation code to your email address. Please check your inbox (or your junk folder).
            </p>
            <form className={"space-y-4"} action={submitConfirmSignup}>
                <div>
                    <label className={"form-label"} htmlFor={"code"}>Confirmation Code</label>
                    <ConfirmationCodeInput setIsValidCode={setIsValidCode}/>
                </div>
                <Button
                    disabled={!isValidCode || pending}
                    text={pending ? "Confirming..." : "Confirm"}
                    type={"submit"}
                    icon={icons.check}
                    title={!isValidCode ? "The confirmation code is not valid." : undefined}
                />
                {error && <p className={"form-error ml-1"}>
                    {error}
                </p>}
                {success && <p className={"form-success ml-1"}>
                    Confirmation successful. Redirecting you to log in...
                </p>}
            </form>
        </div>
    )
}
