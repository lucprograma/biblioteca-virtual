import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: DataTypes.STRING,
  role: { type: DataTypes.ENUM('admin', 'regular'), allowNull: false },
  dni: DataTypes.INTEGER,
  has_certificate: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  last_login: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;
