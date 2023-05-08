import sequelize from "../database";
import { DataTypes } from "sequelize";

const Chapter = sequelize.define('chapter', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    num: DataTypes.INTEGER,
    name: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: true,
        primaryKey: false
    },
    outline: DataTypes.TEXT
})

export default Chapter