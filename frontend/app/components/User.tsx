import { IUser } from "@aapc/types"
import DisplayIcon from "@/app/components/DisplayIcon"
import React from "react"

export type UserProps = {
    user: IUser,
    size ? : "small" | "regular" | "large"
}


export default function User({ user, size = "regular" }: UserProps) {
    let style = ""
    switch (size) {
        case "small": {
            style = "px-1.5 py-0.5"
        } break
        case "regular": {
            style = "px-2 py-0.5"
        } break
        case "large": {
            style = "px-3 py-1.5"
        } break
    }

    return (
        <div className={`flex flex-nowrap flex-shrink-0 flex-row items-center gap-x-1.5 py-0.5 ${style}`}>
            <DisplayIcon
                nextSize={64}
                className={"h-5 w-5"}
                src={user.iconSrc}
                displayName={user.displayName}
            />
            <p className={`font-medium ${size === "small" ? "smaller" : ""}`}>
                {user.displayName}
            </p>
        </div>
    )
}
