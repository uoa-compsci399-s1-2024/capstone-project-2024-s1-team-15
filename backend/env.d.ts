declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: string
            PORT?: number
            MONGO_URI?: string
            JWT_SECRET?: string
            COGNITO_CLIENT_ID?: string
            COGNITO_USERPOOL_ID?: string
            BREVO_CLIENT_EMAIL?: string
            BREVO_CLIENT_PASSWORD?: string
            GOOGLE_RECAPTCHA_SECRET_KEY?: string
        }
    }
}
