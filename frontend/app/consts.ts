let uri;

switch (process.env.ENV) {
    case "LOCAL": {
        uri = "http://localhost:3000"
        break
    }
    case "DEV": {
        uri = "https://dev-api.aapc-nz.org"
        break
    }
    case "PROD": {
        uri = "https://api.aapc-nz.org"
        break
    }
    default: {
        uri = "http://localhost:3000"
    }
}

export const API_URI = uri
export const WEBSITE_NAME = "Aotearoa Airborne Pollen Collective"
