import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import validateSchema from '../middlewares/validateSchema.js';
import chkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/login', validateSchema(loginSchema), login);
router.post('/register', validateSchema(registerSchema), register);



export default router;
