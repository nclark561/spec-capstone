import * as pg from 'pg';
import { Sequelize } from "sequelize";

const connectionString = process.env.CONNECTION_STRING as string

const sequelize = new Sequelize(connectionString,  {
    dialectModule: pg,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

export default sequelize