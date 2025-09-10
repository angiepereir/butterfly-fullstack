import "dotenv/config";
import { Sequelize } from "sequelize";

const isTest = process.env.NODE_ENV === "test";

const db_connection = new Sequelize(
  isTest ? process.env.DB_NAME_TEST : process.env.DB_NAME, // cambia según entorno
  process.env.DB_USER, 
  process.env.DB_PASSWORD ?? "", 
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    define: { timestamps: false },
    logging: !isTest, // Desactiva logs en test
  }
);

export default db_connection;
