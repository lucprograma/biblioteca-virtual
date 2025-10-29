import { DataTypes } from 'sequelize';
import sequelize from '../config/db/db.js';
import Folder from './Folder.js';

const Career = sequelize.define('Career', {
  id_career: { 
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
  tableName: 'career',
  timestamps: false
});


export default Career;