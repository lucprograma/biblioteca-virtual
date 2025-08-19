import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Folder from './folder.js';

const Document = sequelize.define('Document', {
    document_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: {type: DataTypes.TEXT, allowNull: false },
    uploaded_by: { type: DataTypes.INTEGER, allowNull: false },
    folder_id: {type: DataTypes.INTEGER, allowNull: false},
    created_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW }
},{
  tableName: 'documents',
  timestamps: false,
}
);
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
export default Document;