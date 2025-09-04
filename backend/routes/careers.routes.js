import express from 'express';
import validateSchema from '../middlewares/validateSchema.js';
import chkToken from '../middlewares/checkToken.js';
import {get_careers} from '../controllers/career_controller.js';

const router = express.Router();

router.get('/', chkToken,checkAdmin,get_careers)//trae todas las carreras
//router.post('/tokenchk', chkToken, ()=>{console.log("pass")});



export default router;
