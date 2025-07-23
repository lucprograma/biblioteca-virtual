import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_USER_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    logging: false, // para que no muestre mucho log en consola, opcional
  }
);

try {
  await sequelize.authenticate();
  console.log('Conexión a la base de datos exitosa');
} catch (error) {
  console.error('❌ Error de conexión a la BD:', error.message);
}

export default sequelize;


