import dotenv from "dotenv";
import IRepository from "./IRepository";
import MemoryRepository from "./memory/MemoryRepository";
import MongoRepository from "./mongo/MongoRepository";

dotenv.config();

let repo: "memory" | "mongo-dev" | "mongo-prod";

switch (process.env.ENV) {
  case "LOCAL": {
    repo = "memory";
    break;
  }
  case "DEV": {
    repo = "mongo-dev";
    break;
  }
  case "PROD": {
    repo = "mongo-prod";
    break;
  }
  default: {
    repo = "memory";
  }
}

export let DB: IRepository;

switch (repo) {
  case "mongo-dev": {
    DB = new MongoRepository(process.env.MONGO_DEV_URI ?? "");
    break;
  }
  case "mongo-prod": {
    DB = new MongoRepository(process.env.MONGO_PROD_URI ?? "");
    break;
  }
  default:
    DB = new MemoryRepository();
    break;
}
