import { UserScope } from "@aapc/types"

export const DEFAULT_PER_PAGE = 15
export const DEFAULT_MAX_PER_PAGE = 250
export const DEFAULT_ID_LENGTH = 8
export const DEFAULT_IMAGE_ID_LENGTH = 12
export const STATIC_FILE_DIRECTORY = "static"
export const IMAGE_UPLOAD_LIMIT = 15 * 1024 * 1024  // 15 MB
export const LOCAL_JWT_SECRET = "85e91a860a074a105b9da848a3c96d94d8aa0aa6468941a1c1de4ff4a8eda636"

export const SCOPES = {
    user: [UserScope.user, UserScope.regular, UserScope.premium, UserScope.maintainer, UserScope.admin],

    regularAndPremium: [UserScope.regular, UserScope.premium, UserScope.maintainer, UserScope.admin],

    regular: [UserScope.regular, UserScope.maintainer, UserScope.admin],

    premium: [UserScope.premium, UserScope.maintainer, UserScope.admin],

    maintainer: [UserScope.maintainer, UserScope.admin],

    admin: [UserScope.admin]
}
