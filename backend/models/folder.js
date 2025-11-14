import sequelize from "../config/db/db.js";
import { DataTypes } from "sequelize";


const Folder = sequelize.define(
  "Folder",
  {
    folder_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    parent_id: { type: DataTypes.INTEGER, allowNull: true },
    type: {type: DataTypes.ENUM('Course', 'Year'), allowNull: false, defaultValue: 'Course'},
    year_level: { type: DataTypes.ENUM('Primer Año', 'Segundo Año', 'Tercer Año', 'Cuarto Año', 'Quinto Año'), allowNull: true}
  },
  {
    tableName: "folders",
    timestamps: false,
  });
Folder.hasMany(Folder, {
  foreignKey: "parent_id",
  sourceKey: "folder_id",
  as: "children",})
Folder.belongsTo(Folder, {
    foreignKey: "parent_id",
    targetKey: "folder_id",
    as: "parent",
});

export default Folder;