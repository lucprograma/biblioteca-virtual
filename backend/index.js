import dotenv from 'dotenv';
import 'dotenv/config';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authConnectionDB from './config/db/index.js';
import mailServiceStatus from './extra_services/mail/index.js';

//Routes
import routerApi from './routes/index.js';


const app = express();
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

app.use("/uploads", express.static("uploads"))
// Middleware para que pueda leer JSON
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());

/*app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);*/

//Nexo de rutas
routerApi(app);

// Ruta de prueba base
app.get('/', (req, res) => {
  res.send('API Centro Estudiantes funcionando');
});

// Conexión a la base de datos y levantamos el servidor
authConnectionDB(app);

//Verificar conexión con el servicio de Gmail.
mailServiceStatus();