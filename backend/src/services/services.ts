import dotenv from "dotenv"
import AuthContext from "@/services/auth/auth.service"
import LocalAuthService from "@/services/auth/local/Local.auth.service"
import AWSCognitoAuthService from "@/services/auth/aws-cognito/AWSCognito.auth.service"
import IRepository from "@/services/repository/repository.service"
import MemoryRepository from "@/services/repository/local/Memory.repository.service"
import MongoRepository from "@/services/repository/mongo/Mongo.repository.service"
import IMailer from "@/services/mailer/mailer.service"
import ConsoleMailer from "@/services/mailer/local/Console.mailer.service"
import BrevoMailer from "@/services/mailer/brevo/Brevo.mailer.service"
import ICDNService from "@/services/cdn/cdn.service"
import LocalCDNService from "@/services/cdn/local/Local.cdn.service"
import AWSS3CDNService from "@/services/cdn/aws-s3/AWSS3.cdn.service"
import ProcessEnv = NodeJS.ProcessEnv

dotenv.config()

export let AUTH: AuthContext
export let DB: IRepository
export let MAILER: IMailer
export let CDN: ICDNService

switch (process.env.ENV) {
    case "DEV":
    case "PROD": {
        console.log(`Environment: ${process.env.ENV}`)

        const requiredEnvVariables: (keyof ProcessEnv)[] = [
            "MONGO_URI", "JWT_SECRET",
            "BREVO_CLIENT_EMAIL", "BREVO_CLIENT_PASSWORD",
            "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION",
            "AWS_COGNITO_CLIENT_ID", "AWS_COGNITO_USERPOOL_ID",
            "GOOGLE_RECAPTCHA_SECRET_KEY"
        ]

        const missingEnvVariables: (keyof ProcessEnv)[] = requiredEnvVariables.filter(
            ev => !process.env[ev]
        )
        if (missingEnvVariables.length > 0) {
            throw new Error("Missing required environment variables: " + missingEnvVariables.join(", "))
        }

        AUTH = new AuthContext(
            new AWSCognitoAuthService(
                <string>process.env.AWS_COGNITO_CLIENT_ID,
                <string>process.env.AWS_COGNITO_USERPOOL_ID
            ),
            <string>process.env.JWT_SECRET
        )

        DB = new MongoRepository(
            <string>process.env.MONGO_URI
        )

        MAILER = new BrevoMailer(
            <string>process.env.BREVO_CLIENT_EMAIL,
            <string>process.env.BREVO_CLIENT_PASSWORD
        )

        CDN = new AWSS3CDNService(process.env.ENV === "DEV"
            ? 'dev-aapc-media'
            : 'aapc-media'
        )
    } break
    default: {
        console.log(`Environment: LOCAL`)

        AUTH = new AuthContext(new LocalAuthService())
        DB = new MemoryRepository()
        MAILER = new ConsoleMailer()
        CDN = new LocalCDNService()
    }
}
