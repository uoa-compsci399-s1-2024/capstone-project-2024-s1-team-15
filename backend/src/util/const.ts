import { User, UserScope } from "@aapc/types"

export const DEFAULT_PER_PAGE = 15
export const DEFAULT_MAX_PER_PAGE = 250
export const DEFAULT_ID_LENGTH = 8
export const DEFAULT_IMAGE_ID_LENGTH = 12
export const STATIC_FILE_DIRECTORY = "static"
export const IMAGE_UPLOAD_LIMIT = 15 * 1024 * 1024  // 15 MB

export const DUMMY_USER = new User({
    username: "foobar",
    displayName: "John Doe",
    email: "john.doe@example.com",
    verified: true,
    registeredAt: new Date().toISOString(),
})

export const SCOPES = {
    user: [UserScope.user, UserScope.regular, UserScope.premium, UserScope.maintainer, UserScope.admin],

    regularAndPremium: [UserScope.regular, UserScope.premium, UserScope.maintainer, UserScope.admin],

    regular: [UserScope.regular, UserScope.maintainer, UserScope.admin],

    premium: [UserScope.premium, UserScope.maintainer, UserScope.admin],

    maintainer: [UserScope.maintainer, UserScope.admin],

    admin: [UserScope.admin]
}
