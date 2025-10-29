import express from 'express';
import {
    getAllDocuments,
    getByTag,
    fetchByParent,
    createDocument
} from '../controllers/documents.controller.js';
import upload from '../config/multer/multerConfig.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();


router.get("/", getAllDocuments);
router.get("/find_tag/:tag", getByTag);
router.get("/findByFolder/:folder_id", fetchByParent);


router.use(checkToken, checkAdmin)

router.post("/createDocument", upload.single('file'), createDocument)

export default router