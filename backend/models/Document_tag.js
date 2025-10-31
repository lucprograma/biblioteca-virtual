import { DataTypes } from 'sequelize';
import sequelize from '../config/db/db.js';

const DocumentTag = sequelize.define('DocumentTag', {
  document_tags_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  document_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'documents', key: 'document_id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'tags', key: 'tag_id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'document_tags',
  timestamps: false,
  indexes: [
    // Evita duplicados del mismo par document_id + tag_id
    { unique: true, fields: ['document_id', 'tag_id'] },
    { fields: ['document_id'] },
    { fields: ['tag_id'] }
  ]
});


export default DocumentTag;