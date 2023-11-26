import { config } from "dotenv";

config();

export const variables = {
    SERVER:{
        PORT: process.env.PORT || 5000,
        MODE: process.env.MODE || 'development',
    },
    JWT:{
        SECRET_KEY: process.env.JWT_SECRET_KEY || "",
    },
    CRYPTO:{
        SECRET: process.env.CRYPTO_SECRET || "",
    },
    DATA_BASE:{
        URL: process.env.DATA_BASE_URL || 'mongodb://0.0.0.0:27017',
        NAME: process.env.DATA_BASE_NAME || 'db_tarefas',
    }
}