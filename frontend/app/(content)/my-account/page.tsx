"use client"

import React from "react"
import { useAuth } from "@/app/lib/hooks"
import { Nullable } from "@/app/lib/types"
import icons from "@/app/lib/icons"
import Button from "@/app/components/Button"
import EditDisplayIconForm from "@/app/(content)/my-account/components/EditDisplayIconForm"
import EditDisplayNameForm from "@/app/(content)/my-account/components/EditDisplayNameForm"
import EditEmailForm from "@/app/(content)/my-account/components/EditEmailForm"

export type FormState = {
    error?: string
    successMessage?: string
}

export default function Page(): Nullable<React.JSX.Element> {
    const { user } = useAuth()

    return user && (
        <div>
            <h1 className={"page-title"}>My Account</h1>
            <div className={"space-y-6"}>
                <div className={"max-w-full flex flex-col"}>
                    <label className={"form-label"}>Username (Cannot be changed)</label>
                    <input className={"form-input max-w-96 text-gray-400 select-none cursor-not-allowed"} readOnly value={user.username}/>
                </div>
                <EditDisplayIconForm currentSrc={user.iconSrc}/>
                <EditDisplayNameForm displayName={user.displayName}/>
                <EditEmailForm email={user.email}/>
                <div>
                    <label className={"form-label"}>Account Management</label>
                    <div className={`p-4 bg-red-100 shadow-inner rounded-2xl w-max mt-1
                        bg-opacity-60 hover:bg-opacity-800 transition
                    `}>
                        <div className={"space-y-4"}>
                            <Button
                                text={"Change Password"}
                                theme={"red"} icon={icons.key}
                                className={"min-w-[232px]"}
                            />
                            <Button
                                text={"Deactivate Account"}
                                theme={"red"} icon={icons.deactivate}
                                className={"min-w-[232px]"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
