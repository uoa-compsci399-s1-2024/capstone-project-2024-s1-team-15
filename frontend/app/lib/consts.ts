import dotenv from "dotenv"
import Page from "@/app/type/PageType"
import { UserScope } from "@aapc/types"

dotenv.config()

export let API_URI: string
export let ENV: "DEV" | "PROD" | "LOCAL"

switch (process.env.NEXT_PUBLIC_ENV) {
    case "DEV": {
        API_URI = "https://dev-api.aapc-nz.org"
        ENV = "DEV"
        break
    }
    case "PROD": {
        API_URI = "https://api.aapc-nz.org"
        ENV = "PROD"
        break
    }
    default: {
        API_URI = "http://localhost:3000"
        ENV = "LOCAL"
    }
}

export const WEBSITE_NAME = "Aotearoa Airborne Pollen Collective"

export const ROUTES = {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",

    REDIRECT_AFTER_LOGIN: "/",

    EDIT_POLLEN_DATA: "/pollen/edit",
}

export const PUBLIC_FRONT_END_PAGES: Page[] = [
    { name: "Pollen", url: "/pollen" },
    { name: "Health", url: "/health" },
    { name: "Research", url: "/research" },
    { name: "News", url: "/news" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
]

export const OPEN_AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.FORGOT_PASSWORD] // no auth required for these ones

export const SCOPES = {
    anonymous: [],
    loggedIn: [UserScope.user, UserScope.regular, UserScope.premium, UserScope.maintainer, UserScope.admin],
    premium: [UserScope.premium, UserScope.maintainer, UserScope.admin],
    maintainer: [UserScope.maintainer, UserScope.admin],
    admin: [UserScope.admin],
}