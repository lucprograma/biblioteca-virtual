import express from 'express';
//import validateSchema from '../middlewares/validateSchema.js';
import checkToken from '../middlewares/checkToken.js';
import {
    getAllCareer,
    NewCareer,
    updateCareer
} from '../controllers/careers.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();


router.get('/', getAllCareer)//trae todas las carreras


router.use(checkToken, checkAdmin)

router.post('/', NewCareer)

router.patch('/:id', updateCareer)


export default router;