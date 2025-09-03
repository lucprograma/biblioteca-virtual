import express from 'express';
import validateSchema from '../middlewares/validateSchema.js';
import chkToken from '../middlewares/checkToken.js';
import { login, register,patchProfile,deleteProfile ,deleteThis, logout,getUsersAdmin, getUnactive} from '../controllers/auth.controller.js';
import { loginSchema, registerSchema,patchUserSchema } from '../schemas/auth.schema.js';
import checkAdmin from '../middlewares/checkAdmin.js';//midleware para verificar si es admin


const router = express.Router();

router.post('/login', validateSchema(loginSchema), login);
router.post('/register', validateSchema(registerSchema), register);//hay que poner midleware de admin cuando llegue el momento
router.get('/profile', chkToken,checkAdmin,getUsersAdmin)//trae todos usuario 
//router.get('/crontest', crontest)//trae todos usuario 
router.get('/unactive', getUnactive);//Obtiene los usuarios inactivos

router.patch('/profile', chkToken,checkAdmin, validateSchema(patchUserSchema), patchProfile); //actualizar usuario
router.patch('/lowuser', chkToken, checkAdmin,validateSchema(patchUserSchema), patchProfile); //baja de usuario (activo inactivo)
router.delete('/delete', chkToken,checkAdmin,deleteProfile); //eliminar usuario por body(rol administrador)
router.delete('/delete/:id', chkToken,deleteThis); //eliminar propio usuario, llega id por body
router.post('/logout', logout);//cerras la sesion actual


router.post('/tokenchk', chkToken, (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'No autorizado' });

  const { email, role, name } = req.user;
  console.log(req.user)
  res.json({ email, role, name });});



export default router;
