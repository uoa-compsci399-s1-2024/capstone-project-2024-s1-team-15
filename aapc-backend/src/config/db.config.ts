import dotenv from "dotenv";

dotenv.config();

export const db = {
    host: process.env.DB_HOST,
    database: process.env.DB_PORT,
    port: process.env.PORT
}
