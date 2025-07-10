import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import sequelize from './config/db.js';
import authRoutes from './routes/auth.routes.js';



const app = express();

// Middleware para que pueda leer JSON
app.use(express.json());

// Rutas agrupadas por módulo
app.use('/api/auth', authRoutes);

// Ruta de prueba base
app.get('/', (req, res) => {
  res.send('API Centro Estudiantes funcionando');
});

// Conexión a la base de datos y levantamos el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a MySQL');
    app.listen(3000, () => {
      console.log('Servidor escuchando en http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Error de conexión a la BD:', err.message);
  });
