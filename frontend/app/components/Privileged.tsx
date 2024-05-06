"use client"

import React, { PropsWithChildren } from "react"
import { UserScope } from "@aapc/types"
import { getScopesFromToken } from "@/app/lib/util"
import { useAuth } from "@/app/lib/hooks"

type Props = { requiredScopes: UserScope[] }

export default function Privileged({ children, requiredScopes }: PropsWithChildren<Props>): React.JSX.Element {
    const userScope = getScopesFromToken(useAuth().token)

    return (
        <>
            { userScope && userScope.some(s => requiredScopes.includes(s)) &&
                children
            }
        </>
    )
}
