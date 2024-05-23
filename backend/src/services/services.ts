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
import ICDNService from "@/services/cdn/cdn.service";
import AWSS3CDNService from "@/services/cdn/aws-s3/AWSS3.cdn.service";
import LocalCDNService from "@/services/cdn/local/Local.cdn.service";
import ProcessEnv = NodeJS.ProcessEnv;
import * as process from "process";

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
            "MONGO_URI",
            "JWT_SECRET",
            "COGNITO_CLIENT_ID", "COGNITO_USERPOOL_ID",
            "BREVO_CLIENT_EMAIL", "BREVO_CLIENT_PASSWORD",
            "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_SESSION_TOKEN", "AWS_REGION"
        ]

        const missingEnvVariables: (keyof ProcessEnv)[] = requiredEnvVariables.filter(ev => {
            if (!process.env[ev]) return ev
        })

        if (missingEnvVariables.length > 0) {
            throw new Error("Missing required environment variables: " + missingEnvVariables.join(", "))
        }

        if (!process.env.GOOGLE_RECAPTCHA_SECRET_KEY) {
            console.error(
                `Google reCAPTCHA is is disabled as GOOGLE_RECAPTCHA_SECRET_KEY is missing from environment variables.`
            )
        }

        AUTH = new AuthContext(
            new AWSCognitoAuthService(
                <string>process.env.COGNITO_CLIENT_ID,
                <string>process.env.COGNITO_USERPOOL_ID
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
        break
    }
    default: {
        console.log(`Environment: LOCAL`)
        AUTH = new AuthContext(new LocalAuthService())
        DB = new MemoryRepository()
        MAILER = new ConsoleMailer()
        CDN = new LocalCDNService()
        break
    }
}
