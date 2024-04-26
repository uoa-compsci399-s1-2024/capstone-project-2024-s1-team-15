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

export const ROUTES = {
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",

    REDIRECT_AFTER_LOGIN: "/news/publish",
}

export const OPEN_CMS_ROUTES = [ROUTES.LOGIN, ROUTES.FORGOT_PASSWORD] // no auth required for these ones
