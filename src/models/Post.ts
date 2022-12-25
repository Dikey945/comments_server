import { sequelize } from "../utils/db";
import { DataTypes } from "sequelize";

export const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    allowNull: false
  }
})