import { DataTypes } from 'sequelize';
import sequelize from '../config/db/db.js';

const Career = sequelize.define('Career', {
  career_id: { 
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
  tableName: 'careers',
  timestamps: false
});


export default Career;