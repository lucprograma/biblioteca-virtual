import dotenv from 'dotenv';
import 'dotenv/config';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import sequelize from './config/db.js';
import cors from 'cors';
import transporter from './extra_services/nodemailer.js';

//Routes
import authRoutes from './routes/auth.routes.js';
import documentsRoutes from './routes/documents.routes.js';
import folderRoutes from './routes/folder.routes.js';
import newsRoutes from './routes/news.route.js';
import careerRoutes from './routes/careers.routes.js';
import tagsRoutes from './routes/tags.routes.js';
import {startCronCheckUp} from '../backend/controllers/auth.controller.js'
import path from "path";
const app = express();
<<<<<<< Updated upstream
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.0.239:5173",
  "http://186.136.38.57:5173"
];
const corsOptions = {
        origin: true, // Reflects the request origin, allowing all origins dynamically
        credentials: true, // Allow cookies and other credentials
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Specify allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed request headers
    };
app.use(cors(corsOptions));
=======

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
>>>>>>> Stashed changes
app.use("/uploads", express.static("uploads"))
// Middleware para que pueda leer JSON
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  })
);

// Rutas agrupadas por módulo
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/folders', folderRoutes)
app.use('/api/documents', documentsRoutes)
app.use('/api/careers', careerRoutes);
app.use('/api/tags', tagsRoutes);

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

//Verificar conexión con el servicio de Gmail.
transporter.verify()
.then(
  console.log("📨 Mail service connected succesfully!")
).catch((err) =>
  console.error("🔌 Error to connect with the mail service!\n", err)
);