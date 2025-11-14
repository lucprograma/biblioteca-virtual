import express from 'express';
//import validateSchema from '../middlewares/validateSchema.js';
import chekToken from '../middlewares/checkToken.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import {
    getAllTags,
    createTag,
    updateTag,
    deleteTag
} from '../controllers/tags.controller.js';


const router = express.Router();


router.get("/", getAllTags);


router.use(chekToken, checkAdmin)

router.post("/", createTag);
router.patch("/", updateTag);
router.delete("/", deleteTag);

export default router