import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import documentsRoutes from './routes/documents.routes.js';
import folderRoutes from './routes/folder.routes.js';
import newsRoutes from './routes/news.route.js';
import careerRoutes from './routes/careers.routes.js';
import {startCronCheckUp} from '../backend/controllers/auth.controller.js'

const app = express();

// Middleware para que pueda leer JSON
app.use(express.json());
app.use(cookieParser());
// Rutas agrupadas por módulo
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/careers', careerRoutes);
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
      startCronCheckUp();
    });
  })
  .catch((err) => {
    console.error('Error de conexión a la BD:', err.message);
  });
