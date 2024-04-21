import dotenv from "dotenv";
import IRepository from "./IRepository";
import MemoryRepository from "./memory/MemoryRepository";

dotenv.config()

let repo: "memory" | "mongo-dev" | "mongo-prod"

switch (process.env.ENV) {
    case "LOCAL": {
        repo = "memory"
        break
    }
    case "DEV": {
        repo = "mongo-dev"
        break
    }
    case "PROD": {
        repo = "mongo-prod"
        break
    }
    default: {
        repo = "memory"
    }
}

export let DB: IRepository

switch (repo) {
    default:  // TODO: change when implementing mongo
        DB = new MemoryRepository()
        break
}
