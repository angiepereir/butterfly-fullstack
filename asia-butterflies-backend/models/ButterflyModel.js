import { DataTypes } from "sequelize";
import db_connection from "../database/db_connection.js";
const ButterflyModel = db_connection.define(
  "butterflies",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

    name: { type: DataTypes.STRING, allowNull: false },
    sciname: { type: DataTypes.STRING, allowNull: true },
    shortDescription: { type: DataTypes.STRING(1000), allowNull: true },
    longDescription: { type: DataTypes.TEXT, allowNull: false },

    activity: { type: DataTypes.TINYINT.UNSIGNED, allowNull: true },
    status: { type: DataTypes.TINYINT.UNSIGNED, allowNull: true },

    region: { type: DataTypes.STRING, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true },
    imageUrl: { type: DataTypes.STRING(2048), allowNull: true },
  },
  {
    timestamps: false,
  }
);

export default ButterflyModel;
