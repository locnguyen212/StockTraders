import "dotenv/config";

export const db = {
    name: process.env.MONGO_INITDB_DATABASE,
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT
};

export const app_port = process.env.APP_PORT || 3000;

export const apiBody = {
    TotalTradeRealRequest: {
        account: process.env.API_ACCOUNT || 'StockTraders'
    }
}

export const apiUrl = process.env.API_URL || 'https://stocktraders.vn/service/data/getTotalTradeReal';

export const kafkaConfig = {
    cliendId: process.env.KAFKA_CLIENT_ID,
    brokers: process.env.KAFKA_BROKERS.split(' '),
    groupId: process.env.KAFKA_GROUP_ID
}