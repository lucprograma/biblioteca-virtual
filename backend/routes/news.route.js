import express from 'express';
import {addNews,deleteNews,updateNews,getNews} from '../controllers/news.controller.js';
import {newsSchema} from '../schemas/news.schema.js';
import validateSchema from '../middlewares/validateSchema.js';//middleware para validar el esquema
import chkToken from '../middlewares/checkToken.js';//middleware para verificar el token
import checkAdmin from '../middlewares/checkAdmin.js';//midleware para verificar si es admin


const router = express.Router();

router.post('/', chkToken,checkAdmin,validateSchema(newsSchema),addNews); // agregar noticia
router.delete('/delete', chkToken,checkAdmin, deleteNews); // eliminar noticia id
router.patch('/update', chkToken,checkAdmin, validateSchema(newsSchema), updateNews); // actualizar noticia
router.get('/',getNews); // obtener todas las noticias   o por id desde body .desprotegido?


export default router;

