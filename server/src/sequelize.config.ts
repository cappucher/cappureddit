import * as dotenv from "dotenv"
import { Sequelize } from "sequelize";

dotenv.config({ path: '.env.local' });

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST!,
    dialect: "postgres"
});

const connectToDB = async (): Promise<boolean> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
}

export { connectToDB, sequelize }