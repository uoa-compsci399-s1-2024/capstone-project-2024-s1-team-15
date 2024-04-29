declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ENV: string
            PORT?: number
            MONGO_URI?: string
            JWT_SECRET?: string
            COGNITO_CLIENT_ID?: string
            COGNITO_USERPOOL_ID?: string
        }
    }
}
