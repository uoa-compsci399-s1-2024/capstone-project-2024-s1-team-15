import React, { useEffect } from "react"
import { UserScope } from "@aapc/types"
import { redirect, usePathname } from "next/navigation"
import { useAuth } from "@/app/lib/hooks"
import { getScopesFromToken } from "@/app/lib/util"

export default function withPrivilege (checkScopeIncludesAny: UserScope[], WrappedComponent: React.JSX.Element) {
    return (function ComponentWithState () {
        const pathname = usePathname()
        const { token, clearSession, loading, refreshSession } = useAuth()
        const scope = getScopesFromToken(token)

        useEffect(() => {
            if (!loading) refreshSession()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [loading])

        if (checkScopeIncludesAny.length !== 0 && !loading) {
            if (!token || !scope) {
                clearSession()
                const message = "You must be logged in to view this page."
                return redirect(`/login?from=${btoa(pathname)}&msg=${btoa(message)}`)
            } else if (!scope.some(s => checkScopeIncludesAny.includes(s))) {
                const message = "You do not have the permission to view this page."
                return redirect(`/?msg=${btoa(message)}`)
            }
        }

        return !loading
            ? <>{WrappedComponent}</>
            : <></>
    })()
}
