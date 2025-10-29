import express from 'express';
//import validateSchema from '../middlewares/validateSchema.js';
import chkToken from '../middlewares/checkToken.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import {
    getAllTags,
    createTag,
    updateTag,
    deleteTag
} from '../controllers/tags.controller.js';


const router = express.Router();


router.use(chkToken)

router.get("/", getAllTags);


router.use(checkAdmin)

router.post("/", createTag);
router.put("/", updateTag);
router.delete("/", deleteTag);

export default router