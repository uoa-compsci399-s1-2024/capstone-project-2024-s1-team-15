import AWSCognitoAuthService from "@/services/auth/aws-cognito/AWSCognito.auth.service"
import LocalAuthService from "@/services/auth/local/Local.auth.service"
import AuthContext from "@/services/auth/auth.service"
import MongoRepository from "@/services/repository/mongo/Mongo.repository.service"
import MemoryRepository from "@/services/repository/memory/Memory.repository.service"
import IRepository from "@/services/repository/repository.service"
import dotenv from "dotenv"

dotenv.config()

export let AUTH: AuthContext
export let DB: IRepository

switch (process.env.ENV) {
    case "DEV" || "PROD": {
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

        if (missingEnvVariables.length > 0){
            throw new Error("Missing environment variables " + missingEnvVariables.toString())
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
        break
    }
    default: {
        console.log("environment variable ENV not loaded; using default (local)")
        AUTH = new AuthContext(new LocalAuthService())
        DB = new MemoryRepository()
        break
    }
}
