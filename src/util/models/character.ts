import sequelize from "../database";
import { DataTypes } from "sequelize";

const Character = sequelize.define('character', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    description: DataTypes.TEXT
})

export default Character