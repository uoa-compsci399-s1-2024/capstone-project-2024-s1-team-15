"use client"

import { useAuth } from "@/app/lib/hooks"
import { Nullable } from "@/app/lib/types"
import React from "react"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import { useFormState } from "react-dom";

type FormState = {
    error?: string
    successMessage?: string
}

export default function Page(): Nullable<React.JSX.Element> {
    const { user, token, refreshSession } = useAuth()
    const [displayNameFormState, displayNameFormAction] = useFormState<FormState>(
        async (_: FormState, formData?: any): Promise<FormState> => {
            const displayName = formData?.get("displayName")
            if (!displayName) return { error: "You must enter a display name." }
            return { successMessage: "Display name changed successfully." }
        }, {}
    )

    const [emailFormState, emailFormAction] = useFormState<FormState>(
        async (_: FormState, formData?: any): Promise<FormState> => {
            const email = formData?.get("email")
            if (!email) return { error: "You must enter an email." }
            return { successMessage: "Email changed successfully." }
        }, {}
    )

    return (user &&
        <div>
            <h1 className={"page-title"}>My Account</h1>
            <div className={"space-y-8"}>
                <div>
                    <form className={"space-y-6"} action={displayNameFormAction}>
                        <div className={"max-w-full flex flex-col"}>
                            <label className={"form-label"} htmlFor={"displayName"}>Display Name</label>
                            <input
                                id={"displayName"}
                                name={"displayName"}
                                className={"form-input max-w-72"}
                                placeholder={"John Doe"}
                                defaultValue={user.displayName}
                            />
                        </div>
                        {displayNameFormState.error &&
                            <p className={"form-error"}>{displayNameFormState.error}</p>
                        }
                        {displayNameFormState.successMessage &&
                            <p className={"form-success"}>{displayNameFormState.successMessage}</p>
                        }
                        <Button type={"submit"} theme={"secondary"} text={"Change Display Name"} icon={icons.edit}/>
                    </form>
                </div>
                <div>
                    <form className={"space-y-2"} action={emailFormAction}>
                        <div className={"max-w-full flex flex-col"}>
                            <label className={"form-label"} htmlFor={"email"}>Email</label>
                            <div className={"flex flex-row items-center space-x-6"}>
                                <input
                                    id={"email"}
                                    name={"email"}
                                    className={"form-input max-w-96"}
                                    placeholder={"john.doe@example.com"}
                                    defaultValue={user.email}
                                />
                                <Button type={"submit"} theme={"secondary"} text={"Change Email"} icon={icons.edit}/>
                            </div>
                        </div>
                        {emailFormState.error &&
                            <p className={"form-error"}>{emailFormState.error}</p>
                        }
                        {emailFormState.successMessage &&
                            <p className={"form-success"}>{emailFormState.successMessage}</p>
                        }
                    </form>
                </div>
                <h3>Change Display Icon</h3>
                <h3>Change Password</h3>
                <h3>Deactivate</h3>
            </div>
        </div>
    )
}
