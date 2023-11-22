import { config } from "dotenv";

config();

export default {
    SERVER:{
        PORT: process.env.PORT || 5000,
        MODE: process.env.MODE || 'development',
    },
    JWT:{
        SECRET_KEY: process.env.JWT_SECRET_KEY || "",
    },
    CRYPTO:{
        SECRET: process.env.CRYPTO_SECRET || "",
        ALGORITHM: process.env.CRYPTO_ALGORITHM || "aes256",
        TYPE: process.env.CRYPTO_TYPE || "hex",
    },
    DATA_BASE:{
        URL: process.env.DATA_BASE_URL || 'mongodb://0.0.0.0:27017',
        NAME: process.env.DATA_BASE_NAME || 'db_tarefas'

    }
}