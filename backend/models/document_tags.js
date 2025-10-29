import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Document from './document.js';
import Tag from './tag.js'; // asumimos que ya tenés este modelo con PK `tag_id`

const DocumentTag = sequelize.define('DocumentTag', {
  document_tags_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  document_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'documents', key: 'document_id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'tags', key: 'tag_id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'document_tags',
  timestamps: false,
  indexes: [
    // Evita duplicados del mismo par document_id + tag_id
    { unique: true, fields: ['document_id', 'tag_id'] },
    { fields: ['document_id'] },
    { fields: ['tag_id'] },
  ],
});
// Muchos a muchos a través de document_tags
Document.belongsToMany(Tag, {
  through: DocumentTag,
  foreignKey: 'document_id',
  otherKey: 'tag_id',
  as: 'tags',
});

Tag.belongsToMany(Document, {
  through: DocumentTag,
  foreignKey: 'tag_id',
  otherKey: 'document_id',
  as: 'documents',
});

// (Opcional) Relaciones directas para acceder a la tabla intermedia si te sirve
DocumentTag.belongsTo(Document, { foreignKey: 'document_id', as: 'document' });
DocumentTag.belongsTo(Tag, { foreignKey: 'tag_id', as: 'tag' });

Document.hasMany(DocumentTag, { foreignKey: 'document_id', as: 'documentTags' });
Tag.hasMany(DocumentTag, { foreignKey: 'tag_id', as: 'tagDocuments' });

export default DocumentTag;
