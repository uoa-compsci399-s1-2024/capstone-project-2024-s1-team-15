declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: string
            PORT?: number
            MONGO_URI?: string
            JWT_SECRET?: string
            BREVO_CLIENT_EMAIL?: string
            BREVO_CLIENT_PASSWORD?: string
            GOOGLE_RECAPTCHA_SECRET_KEY?: string
            AWS_ACCESS_KEY_ID?: string
            AWS_SECRET_ACCESS_KEY?: string
            AWS_SESSION_TOKEN?: string
            AWS_REGION?: string
            AWS_COGNITO_CLIENT_ID?: string
            AWS_COGNITO_USERPOOL_ID?: string
        }
    }
}
