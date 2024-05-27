import Link from "next/link"
import React from "react"
import User, { UserProps } from "@/app/components/User";

export default function LinkUser({ size = "regular", user }: UserProps) {
    let style = ""
    switch (size) {
        case "small": {
            style = "rounded-md"
        }
            break
        case "regular": {
            style = "rounded-md"
        }
            break
        case "large": {
            style = "rounded-lg"
        }
            break
    }

    return (
        <Link
            href={`/profile/${user.username}`}
            className={`block text-black max-w-max hover:bg-black hover:bg-opacity-5 transition ${style}`}
        >
            <User size={size} user={user}/>
        </Link>
    )
}
