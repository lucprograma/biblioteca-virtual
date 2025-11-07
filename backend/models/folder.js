import sequelize from "../config/db/db.js";
import { DataTypes } from "sequelize";

const Folder = sequelize.define(
  "Folder",
  {
    folder_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    parent_id: { type: DataTypes.INTEGER, allowNull: true },
    type: {type: DataTypes.ENUM('Career', 'Year'), allowNull: false, defaultValue: 'Career'},
    year_level: { type: DataTypes.ENUM('Primer Año', 'Segundo Año', 'Tercer Año', 'Cuarto Año', 'Quinto Año'), allowNull: true}
  },
  {
    tableName: "folders",
    timestamps: false,
  });


export default Folder;