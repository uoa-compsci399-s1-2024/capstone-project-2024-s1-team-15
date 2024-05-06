import { ROUTES } from "@/../../frontend/app/lib/consts"

let uiUri

switch (process.env.ENV) {
    case "DEV": {
        uiUri = "https://dev.aapc-nz.org"
        break
    }
    case "PROD": {
        uiUri = "https://aapc-nz.org"
        break
    }
    default: {
        uiUri = "http://localhost:3001"
    }
}

export const UI_URI = uiUri
export const URLS = Object.fromEntries(Object.entries(ROUTES).map(([name, route]) => [name, UI_URI + route]))
