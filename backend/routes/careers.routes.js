import express from 'express';
//import validateSchema from '../middlewares/validateSchema.js';
import chkToken from '../middlewares/checkToken.js';
import { getAllCareer,NewCareer,updateCareer} from '../controllers/career.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();


 router.get('/', chkToken, checkAdmin, getAllCareer)//trae todas las carreras
router.post('/', chkToken, checkAdmin, NewCareer)
router.patch('/:id', chkToken, checkAdmin, updateCareer)


export default router;