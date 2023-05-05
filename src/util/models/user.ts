import sequelize from "../database";
import { DataTypes } from "sequelize";

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: DataTypes.STRING,
    hashedPass: DataTypes.STRING
})

export default User;