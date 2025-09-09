import express from 'express';
import multer from 'multer'; // Importar multer
import { addNews, deleteNews, updateNews, getNews } from '../controllers/news.controller.js';
import { newsSchema } from '../schemas/news.schema.js';
import validateSchema from '../middlewares/validateSchema.js'; // middleware para validar el esquema
import chkToken from '../middlewares/checkToken.js'; // middleware para verificar el token
import checkAdmin from '../middlewares/checkAdmin.js'; // middleware para verificar si es admin

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/news/'); // carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // nombre único
  }
});
const upload = multer({ storage });

// Rutas de noticias


router.post(
  '/',
  chkToken,
  checkAdmin,
  upload.single('image'), 
  validateSchema(newsSchema),
  addNews
);

// Eliminar noticia
router.delete(
  '/delete',
  chkToken,
  checkAdmin,
  deleteNews
);


router.patch(
  '/update',
  chkToken,
  checkAdmin,
  upload.single('image'),
  validateSchema(newsSchema),
  updateNews
);

// Obtener noticias (desprotegido)
router.get(
  '/',
  getNews
);

export default router;
