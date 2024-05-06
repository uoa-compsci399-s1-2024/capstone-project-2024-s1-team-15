import { PUBLIC_FRONT_END_PAGES, ROUTES } from "@/../../frontend/app/lib/consts"
import Page from "../../frontend/app/type/PageType"

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
export const PUBLIC_FRONTEND_URLS: Page[] = PUBLIC_FRONT_END_PAGES.map(({ name, url: route }) => ({
    name,
    url: UI_URI + route,
}))
