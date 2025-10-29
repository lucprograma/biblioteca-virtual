import express from 'express';

import validateSchema from '../middlewares/validateSchema.js';
import checkToken from '../middlewares/checkToken.js';
import checkAdmin from '../middlewares/checkAdmin.js';//midleware para verificar si es admin

import {
  login,
  register,
  patchProfile,
  activateUser,
  deleteProfile,
  deleteThis,
  logout,
  getUsersAdmin,
  getUnactive
} from '../controllers/auth.controller.js';
import {
  loginSchema,
  registerSchema,
  patchUserSchema,
  activateUserSchema
} from '../schemas/auth.schema.js';

import { authorize } from '../middlewares/authorize.js';

const router = express.Router();


router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);


router.use(checkToken, checkAdmin) //Middlewares aplicados globalmente a partir de acá. Las rutas previas serán públicas.

router.get('/profile', getUsersAdmin)//trae todos usuarios
//router.get('/crontest', crontest)//trae todos usuario 
router.get('/unactive', getUnactive);//Obtiene los usuarios inactivos

router.post('/tokenchk', (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'No autorizado' });

  const { email, role, name } = req.user;
  console.log(req.user)
  res.json({ email, role, name });
});

router.patch('/profile', validateSchema(patchUserSchema), patchProfile); //actualizar usuario
router.patch('/lowuser', validateSchema(activateUserSchema), activateUser); //baja de usuario (activo inactivo)

router.delete('/delete', deleteProfile); //eliminar usuario por body(rol administrador)
router.delete('/delete/:id', deleteThis); //eliminar propio usuario, llega id por body


export default router;
