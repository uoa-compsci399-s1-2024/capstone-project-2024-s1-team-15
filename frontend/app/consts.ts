let apiUri, uiUri

switch (process.env.ENV) {
    case "LOCAL": {
        apiUri = "http://localhost:3000"
        break
    }
    case "DEV": {
        apiUri = "https://dev-api.aapc-nz.org"
        break
    }
    case "PROD": {
        apiUri = "https://api.aapc-nz.org"
        break
    }
    default: {
        apiUri = "http://localhost:3000"
    }
}

export const API_URI = apiUri // can add custom uri for testing here
export const WEBSITE_NAME = "Aotearoa Airborne Pollen Collective"

export const UI_URI = typeof window === "undefined" ? "" : window.location.origin

export const ROUTES = {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",

    REDIRECT_AFTER_LOGIN: "/news/publish",
}

export const URLS = Object.fromEntries(Object.entries(ROUTES).map(([name, route]) => [name, UI_URI + route]))

export const OPEN_CMS_ROUTES = [ROUTES.LOGIN, ROUTES.FORGOT_PASSWORD] // no auth required for these ones
