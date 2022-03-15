import dotenv from 'dotenv'
dotenv.config()

const ENVS = [
    'PORT',
    'MONGO_HOST',
    'MONGO_PORT',
    'MONGO_USER',
    'MONGO_PASSWORD',
    'MONGO_DB'
]

declare global {
    var Config: {
        PORT: string,
        MONGO_HOST: string,
        MONGO_PORT: string,
        MONGO_USER: string,
        MONGO_PASSWORD: string,
        MONGO_DB: string,
        JWT: string,
    };
}

global.Config = {
    PORT: process.env.PORT as string,
    MONGO_HOST: process.env.MONGO_HOST as string,
    MONGO_PORT: process.env.MONGO_PORT as string,
    MONGO_USER: process.env.MONGO_USER as string,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD as string,
    MONGO_DB: process.env.MONGO_DB as string,
    JWT: process.env.JWT as string,
}


export { }
