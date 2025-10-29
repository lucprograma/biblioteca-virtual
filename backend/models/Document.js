import { DataTypes } from 'sequelize';
import sequelize from '../config/db/db.js';
import Folder from './Folder.js';

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

export default Document;