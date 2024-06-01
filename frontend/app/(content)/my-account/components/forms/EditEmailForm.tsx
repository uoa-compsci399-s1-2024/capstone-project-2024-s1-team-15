import Button from "@/app/components/Button";
import icons from "@/app/lib/icons";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { FormState } from "@/app/(content)/my-account/page";
import { useAuth } from "@/app/lib/hooks";
import { editUser } from "@/app/services/user";
import { Nullable } from "@/app/lib/types";
import { DEFAULT_FORM_DIALOG_DURATION } from "@/app/lib/consts";

type Props = {
    email: string,
    onSuccess?: () => void
}

export default function EditEmailForm({ email, onSuccess }: Props) {
    const { user, token, refreshSession } = useAuth()

    const [showMessage, setShowMessage] = useState(false)
    const [_, setNextTimeout] = useState<Nullable<NodeJS.Timeout>>(null)

    const [formState, formAction] = useFormState<FormState>(
        async (_: FormState, formData?: any): Promise<FormState> => {
            setShowMessage(true)
            setNextTimeout(t => {
                if (t) clearTimeout(t)
                return setTimeout(() => setShowMessage(false), DEFAULT_FORM_DIALOG_DURATION)
            })
            const newEmail = formData?.get("email")
            if (!newEmail) return { error: "You must enter an email." }
            if (newEmail === email) return { error: "New email must be different from current email." }
            if (!user) return { error: "You are not logged in." }
            const r = await editUser(user.username, {
                email: newEmail
            }, { token })
            if (r.success) {
                onSuccess && onSuccess()
                refreshSession()
                return { successMessage: "Email has been successfully changed." }
            } else {
                return { error: r.message }
            }
        }, {}
    )

    return (
        <form className={"space-y-2"} action={formAction}>
            <div className={"max-w-full flex flex-col"}>
                <label className={"form-label"} htmlFor={"email"}>Email</label>
                <div className={`flex items-center justify-self-start gap-x-6 gap-y-2 flex-shrink-0 flex-wrap
                    md:flex-row md:flex-nowrap
                `}>
                    <input
                        id={"email"} name={"email"} type={"email"}
                        className={"form-input max-w-96"}
                        placeholder={"john.doe@example.com"}
                        defaultValue={email}
                    />
                    <Button type={"submit"} theme={"green"} text={"Change Email"} icon={icons.edit}/>
                </div>
            </div>
            {showMessage &&
                <div className={"ml-2"}>
                    {formState.error &&
                        <p className={"form-error"}>{formState.error}</p>
                    }
                    {formState.successMessage &&
                        <p className={"form-success"}>{formState.successMessage}</p>
                    }
                </div>
            }
        </form>
    )
}