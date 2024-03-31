import dotenv from "dotenv";

dotenv.config();

const mongo = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME || "Data"
}

export default mongo
