import { UserScope } from "@aapc/types"
import { RouteConfigParent } from "@/app/lib/types"

const PrivilegedRoutes: RouteConfigParent[] = [
    {
        name: "CMS",
        allowedScopes: [UserScope.maintainer, UserScope.admin],
        children: [
            { route: "/research/publish" },
            { route: "/research/[:id]/edit" },
            { route: "/news/publish" },
            { route: "/news/[:id]/edit" },
            { route: "/pollen/edit" },
        ]
    }
]

export default PrivilegedRoutes
