import express from 'express';
//import validateSchema from '../middlewares/validateSchema.js';
import chkToken from '../middlewares/checkToken.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import  {getAllTags,createTag} from '../controllers/tags.controller.js';


const router = express.Router();

router.get("/", getAllTags);
router.post("/create", chkToken, checkAdmin, createTag);

export default router