"use client"

import { Nullable } from "@/app/lib/types"
import { confirmRegister } from "@/app/services/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ConfirmRegister({ confirmationCode }: { confirmationCode: string }) {
    const router = useRouter()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<Nullable<string>>(null)

    useEffect(() => {
        confirmRegister({ username: "", confirmationCode }).then((result) => {
            if (result.success) {
                setSuccess(true)
                setError(null)
                setTimeout(() => {
                    router.push(`/login`)
                }, 2500)
            } else {
                setError(result.message)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmationCode])

    return (
        <div>
            {error && <p className={"form-error ml-1"}>{error}</p>}
            {success && (
                <p className={"form-success ml-1"}>Your email has been confirmed. Redirecting you to log in...</p>
            )}
        </div>
    )
}
