import dotenv from "dotenv";
import IRepository from "./IRepository";
import MemoryRepository from "./memory/MemoryRepository";

dotenv.config()

const repo = process.env.REPOSITORY || "memory"

export let DB: IRepository

switch (repo) {
    case "memory":
        DB = new MemoryRepository()
        break
}
