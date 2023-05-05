import sequelize from "../database";
import { DataTypes } from "sequelize";

const Book = sequelize.define('book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: DataTypes.STRING,
    summary: DataTypes.TEXT
})

export default Book