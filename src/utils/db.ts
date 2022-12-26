import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();

// @ts-ignore
export const sequelize = new Sequelize(`${process.env.DATABASE_URL}`,
  {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    }
  },
  dialectModule: require('mysql2'),
  dialect: 'mysql',
})