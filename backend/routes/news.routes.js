import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { addNews, deleteNews, updateNews, getNews } from '../controllers/news.controller.js';
import { newsSchema } from '../schemas/news.schema.js';
import validateSchema from '../middlewares/validateSchema.js'; // middleware para validar el esquema
import chkToken from '../middlewares/checkToken.js'; // middleware para verificar el token
import checkAdmin from '../middlewares/checkAdmin.js'; // middleware para verificar si es admin

const router = express.Router();

// carga de archivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/news'));
  },
  filename: (req, file, cb) => {
    // nombre único
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// rutas
router.post('/', chkToken, checkAdmin, upload.single('image'), addNews);
router.delete('/delete', chkToken, checkAdmin, deleteNews);
router.patch('/update', chkToken, checkAdmin, upload.single('image'), updateNews);
router.get('/', getNews); // obtener todas las noticias o por id desde body. desprotegido

export default router;
