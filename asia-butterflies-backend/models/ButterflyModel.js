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

    // 👇 Getters devuelven string; setters guardan int o null
    activity: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      get() {
        const v = this.getDataValue("activity");
        return v == null ? null : String(v); // "0" | "1"
      },
      set(value) {
        if (value === "" || value == null) return this.setDataValue("activity", null);
        this.setDataValue("activity", Number.parseInt(value, 10));
      },
    },

    status: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      get() {
        const v = this.getDataValue("status");
        return v == null ? null : String(v); // "0" | "1" | "2"
      },
      set(value) {
        if (value === "" || value == null) return this.setDataValue("status", null);
        this.setDataValue("status", Number.parseInt(value, 10));
      },
    },

    region: { type: DataTypes.STRING, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true },
    imageUrl: { type: DataTypes.STRING(2048), allowNull: true },
  },
  { timestamps: false }
);

export default ButterflyModel;
