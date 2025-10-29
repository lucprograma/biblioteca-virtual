import sequelize from "../config/db/db.js";
import { DataTypes } from "sequelize";
import Document from "./Document.js";
import Folder from "./Folder.js";


//Document connections
Document.belongsTo(Folder, {
  foreignKey: 'folder_id',
  targetKey: 'folder_id',
  as: 'folder',
});
Folder.hasMany(Document, {
  foreignKey: 'folder_id',
  sourceKey: 'folder_id',
  as: 'documents',
});

//Folder connections
Folder.hasMany(Folder, {
  foreignKey: "parent_id",
  sourceKey: "folder_id",
  as: "children",})
Folder.belongsTo(Folder, {
    foreignKey: "parent_id",
    targetKey: "folder_id",
    as: "parent",
});