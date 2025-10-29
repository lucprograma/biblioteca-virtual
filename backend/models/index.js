import Career from "./Career.js";
import DocumentTag from "./Document_tag.js";
import Document from "./Document.js";
import Folder from "./Folder.js";
import Tag from "./Tag.js";


//Career connections
Career.hasMany(Folder, {
  foreignKey: 'parent_id',
  sourceKey: 'id_career',
  as: 'folders'
});

Folder.belongsTo(Career, {
  foreignKey: 'parent_id',
  targetKey: 'id_career',
  as: 'career'
});



//Document_tag connections
Document.belongsToMany(Tag, {
  through: DocumentTag,
  foreignKey: 'document_id',
  otherKey: 'tag_id',
  as: 'tags',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Tag.belongsToMany(Document, {
  through: DocumentTag,
  foreignKey: 'tag_id',
  otherKey: 'document_id',
  as: 'documents',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

// (Opcional) Relaciones directas para acceder a la tabla intermedia si te sirve
DocumentTag.belongsTo(Document, {
  foreignKey: 'document_id',
  as: 'document'
});

DocumentTag.belongsTo(Tag, {
  foreignKey: 'tag_id',
  as: 'tag'
});

Document.hasMany(DocumentTag, {
  foreignKey: 'document_id',
  as: 'documentTags'
});

Tag.hasMany(DocumentTag, {
  foreignKey: 'tag_id',
  as: 'tagDocuments',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});



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
  as: "children",});

Folder.belongsTo(Folder, {
    foreignKey: "parent_id",
    targetKey: "folder_id",
    as: "parent",
});