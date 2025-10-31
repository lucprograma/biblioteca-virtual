import { DataTypes } from 'sequelize';
import sequelize from '../config/db/db.js';

const News = sequelize.define('News', {
  news_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
  author_id: { type: DataTypes.INTEGER, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true }, // Nuevo campo para la URL de la imagen
  published_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'news',
  timestamps: false
});


export default News;