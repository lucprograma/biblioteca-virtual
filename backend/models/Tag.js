import { DataTypes } from 'sequelize';
import sequelize from '../config/db/db.js';

const Tag = sequelize.define('Tag', {
  tag_id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
}, {
  tableName: 'tags',
  timestamps: false,
});

export default Tag;
