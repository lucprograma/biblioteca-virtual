import express from 'express';
const router = express.Router();
import  {getAllDocuments, getByTag, fetchByParent, createDocument} from '../controllers/documents.controller.js';
import upload from '../config/multerConfig.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkToken from '../middlewares/checkToken.js';
router.get("/", getAllDocuments);
router.get("/find_tag/:tag", getByTag);
router.get("/findByFolder/:folder_id", fetchByParent);
router.post("/createDocument", checkAdmin, checkToken,upload.single('file'),
createDocument)
export default router