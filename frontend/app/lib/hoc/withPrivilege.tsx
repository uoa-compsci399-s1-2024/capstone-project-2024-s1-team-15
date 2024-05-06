import React from "react"
import { UserScope } from "@aapc/types"
import { redirect, usePathname } from "next/navigation"
import { useAuth } from "@/app/lib/hooks"
import { getScopesFromToken } from "@/app/lib/util"

export default function withPrivilege (checkScopeIncludesAny: UserScope[], WrappedComponent: React.JSX.Element) {
    return (function ComponentWithState () {
        const pathname = usePathname()
        const { token, clearSession } = useAuth()
        const scope = getScopesFromToken(token)

        if (checkScopeIncludesAny.length !== 0) {
            if (!token || !scope) {
                clearSession()
                const message = "You must be logged in to view this page."
                return redirect(`/login?from=${btoa(pathname)}&msg=${btoa(message)}`)
            } else if (!scope.some(s => checkScopeIncludesAny.includes(s))) {
                const message = "You do not have the permission to view this page."
                return redirect(`/?msg=${btoa(message)}`)
            }
        }

        return (
            <>{WrappedComponent}</>
        )
    })()
}
