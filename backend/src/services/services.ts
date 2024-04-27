import AWSCognitoAuthService from "@/services/auth/aws-cognito/AWSCognito.auth.service"
import LocalAuthService from "@/services/auth/local/Local.auth.service"
import AuthContext from "@/services/auth/auth.service"
import MongoRepository from "@/services/repository/mongo/Mongo.repository.service"
import MemoryRepository from "@/services/repository/memory/Memory.repository.service"
import IRepository from "@/services/repository/repository.service"

export let AUTH: AuthContext
export let DB: IRepository

switch (process.env.ENV) {
    case "DEV" || "PROD": {
        AUTH = new AuthContext(new AWSCognitoAuthService())
        DB = new MongoRepository(process.env.MONGO_URI ?? "")
        break
    }
    default: {
        AUTH = new AuthContext(new LocalAuthService())
        DB = new MemoryRepository()
        break
    }
}
