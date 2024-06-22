"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ResetPasswordFirebaseForm from "../components/forms/ResetPasswordFirebaseForm"
import ConfirmRegister from "../components/ConfirmRegister"

// User gets directed to this page from any auth action link in an email
export default function FirebaseActionsPage() {
    const params = useSearchParams()
    const [mode, setMode] = useState<string | null|undefined>(undefined)
    const [actionCode, setActionCode] = useState<string | null |undefined>(undefined)

    useEffect(() => {
        setMode(params.get("mode")) // Get the action to complete.
        setActionCode(params.get("oobCode")) // Get the one-time code
    }, [params])

    if(actionCode===undefined || mode===undefined){
        return <></>
    }

    if (actionCode===null || mode===null) {
        return <p className={"form-error ml-1"}>This link is invalid!</p>
    }

    // Handle the user management action.
    return (
        <>
            {mode === "resetPassword" ? (
                <ResetPasswordFirebaseForm verificationCode={actionCode} />
            ) : mode === "verifyEmail" ? (
                <ConfirmRegister confirmationCode={actionCode} />
            ) : (
                <p>Something has gone wrong! There is no mode: {mode}</p>
            )}
        </>
    )
}
