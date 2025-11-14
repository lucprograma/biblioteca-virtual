import { DataTypes } from 'sequelize';
import sequelize from '../config/db/db.js';
import Folder from './Folder.js';

const Course = sequelize.define('Course', {
  id_course: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  created_at: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
}, {
  tableName: 'course',
  timestamps: false
});

// Relaciones
Course.hasMany(Folder, {
  foreignKey: 'parent_id',
  sourceKey: 'id_course',
  as: 'folders'
});

Folder.belongsTo(Course, {
  foreignKey: 'parent_id',
  targetKey: 'id_course',
  as: 'course'
});

export default Course;
