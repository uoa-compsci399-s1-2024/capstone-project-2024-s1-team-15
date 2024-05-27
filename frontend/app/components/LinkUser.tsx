import Link from "next/link"
import React from "react"
import User, { UserProps } from "@/app/components/User";

export default function LinkUser(props: UserProps) {
    let style = ""
    switch (props.size) {
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
            href={`/profile/${props.user.username}`}
            className={`block text-black max-w-max hover:bg-black hover:bg-opacity-5 transition ${style}`}
        >
            <User {...props}/>
        </Link>
    )
}
