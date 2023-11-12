import { config } from "dotenv";

config();

export default {
    PORT: process.env.PORT || 5000,
    MODE: process.env.MODE || 'development',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || ""
}