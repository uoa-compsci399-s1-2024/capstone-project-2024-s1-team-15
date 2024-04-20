let apiUri;

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

export const API_URI = apiUri
export const WEBSITE_NAME = "Aotearoa Airborne Pollen Collective"
