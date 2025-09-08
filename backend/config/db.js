import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      multipleStatements: true
    },
    timezone: '-3:00',
    logging: true, // para que no muestre mucho log en consola, opcional
  }
);

try {
  await sequelize.authenticate();
  console.log('Conexión a la base de datos exitosa');
} catch (error) {
  console.error('❌ Error de conexión a la BD:', error.message);
}

export default sequelize;


