import AWSCognitoAuthService from "@/services/auth/aws-cognito/AWSCognito.auth.service"
import LocalAuthService from "@/services/auth/local/Local.auth.service"
import AuthContext from "@/services/auth/auth.service"
import MongoRepository from "@/services/repository/mongo/Mongo.repository.service"
import MemoryRepository from "@/services/repository/memory/Memory.repository.service"
import IRepository from "@/services/repository/repository.service"
import dotenv from "dotenv"
import IMailer from "./mailer/mailer.service"
import ConsoleMailer from "./mailer/Console.mailer.service"
import BrevoMailer from "./mailer/Brevo.mailer.service"

dotenv.config()

export let AUTH: AuthContext
export let DB: IRepository
export let MAILER: IMailer

switch (process.env.ENV) {
    case "DEV" || "PROD": {
        console.log(`Environment: ${process.env.ENV}`)
        const missingEnvVariables: string[] = []

        if (!process.env.MONGO_URI) {
            missingEnvVariables.push("MONGO_URI")
        }
        if (!process.env.JWT_SECRET) {
            missingEnvVariables.push("JWT_SECRET")
        }
        if (!process.env.COGNITO_CLIENT_ID) {
            missingEnvVariables.push("COGNITO_CLIENT_ID")
        }
        if (!process.env.COGNITO_USERPOOL_ID) {
            missingEnvVariables.push("COGNITO_USERPOOL_ID")
        }
        if (!process.env.BREVO_CLIENT_EMAIL) {
            missingEnvVariables.push("BREVO_CLIENT_EMAIL")
        }
        if (!process.env.BREVO_CLIENT_PASSWORD) {
            missingEnvVariables.push("BREVO_CLIENT_PASSWORD")
        }

        if (missingEnvVariables.length > 0) {
            throw new Error("Missing environment variables " + missingEnvVariables.toString())
        }

        AUTH = new AuthContext(
            new AWSCognitoAuthService(<string>process.env.COGNITO_CLIENT_ID, <string>process.env.COGNITO_USERPOOL_ID),
            <string>process.env.JWT_SECRET
        )
        DB = new MongoRepository(<string>process.env.MONGO_URI)
        MAILER = new BrevoMailer(<string>process.env.BREVO_CLIENT_EMAIL, <string>process.env.BREVO_CLIENT_PASSWORD)
        break
    }
    default: {
        console.log(`Environment: LOCAL`)
        AUTH = new AuthContext(new LocalAuthService())
        DB = new MemoryRepository()
        MAILER = new ConsoleMailer()
        break
    }
}
