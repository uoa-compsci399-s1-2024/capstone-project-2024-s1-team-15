import React from "react"
import { UserScope } from "@aapc/types"
import { Nullable } from "@/app/lib/types"

export default function UserScopeLabel({ scopes }: { scopes: UserScope[] }): React.JSX.Element {
    const getHighestScope = (scopes: UserScope[]): Nullable<UserScope> => {
        if (scopes.indexOf(UserScope.admin) !== -1) {
            return UserScope.admin
        } else if (scopes.indexOf(UserScope.maintainer) !== -1) {
            return UserScope.maintainer
        } else if (scopes.indexOf(UserScope.premium) !== -1) {
            return UserScope.premium
        } else if (scopes.indexOf(UserScope.regular) !== -1) {
            return UserScope.regular
        } else if (scopes.indexOf(UserScope.user) !== -1 ) {
            return UserScope.user
        } else {
            return null
        }
    }

    const highestScope = getHighestScope(scopes)
    if (!highestScope) return <></>

    let highestScopeLabel: string
    let bgColor: string
    let textColor: "text-black" | "text-white" = "text-black"
    switch (highestScope) {
        case UserScope.admin: {
            highestScopeLabel = "Admin"
            bgColor = "bg-admin"
            textColor = "text-white"
            break
        }
        case UserScope.maintainer: {
            highestScopeLabel = "Maintainer"
            bgColor = "bg-maintainer"
            textColor = "text-white"
            break
        }
        case UserScope.premium: {
            highestScopeLabel = "Premium"
            bgColor = "bg-premium"
            break
        }
        default: {
            highestScopeLabel = "User"
            bgColor = "bg-user"
        }
    }

    return (
        <div>
            <p className={`uppercase text-[10px] font-medium tracking-wider ${bgColor} ${textColor} px-2.5 py-1 rounded-full`}>
                {highestScopeLabel}
            </p>
        </div>
    )
}