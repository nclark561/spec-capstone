import { Sequelize } from "sequelize";

const connectionString = process.env.CONNECTION_STRING as string

const sequelize = new Sequelize(connectionString,  {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

export default sequelize