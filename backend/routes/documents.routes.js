import express from 'express';
const router = express.Router();
import  {getAllDocuments, getByTag, fetchByParent, createDocument} from '../controllers/documents.controller.js';
import upload from '../config/multerConfig.js';
router.get("/", getAllDocuments);
router.get("/find_tag/:tag", getByTag);
router.get("/findByFolder/:folder_id", fetchByParent);
router.post("/createDocument", upload.single('file'),
createDocument)
export default router