import express from 'express';
import { login, register,updateProfile,deleteProfile ,deleteThis, logout,getUsersAdmin} from '../controllers/auth.controller.js';
import { loginSchema, registerSchema,patchUserSchema } from '../schemas/auth.schema.js';
import validateSchema from '../middlewares/validateSchema.js';
import chkToken from '../middlewares/checkToken.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();

router.post('/login', validateSchema(loginSchema), login);
router.post('/register',chkToken,checkAdmin, validateSchema(registerSchema), register);

router.get('/profile', chkToken,checkAdmin,getUsersAdmin)//trae todos usuario 

router.patch('/profile', chkToken, validateSchema(patchUserSchema), updateProfile); //actualizar usuario
router.patch('/lowuser', chkToken, validateSchema(patchUserSchema), updateProfile); //baja de usuario (activo inactivo)
router.delete('/delete', chkToken,checkAdmin,deleteProfile); //eliminar usuario por body(rol administrador)
router.delete('/delete/:id', chkToken,deleteThis); //eliminar propio usuario
router.post('/logout', logout);//cerras la sesion actual


router.post('/tokenchk', chkToken, ()=>{console.log("pass")});




export default router;
