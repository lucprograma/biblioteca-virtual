import express from 'express';
import {
    getByParentID,
    getFolderStructure,
    getParentFolders
} from '../controllers/folders.controller.js';


const router = express.Router();

router.get("/", getFolderStructure);
router.get("/parentsFolders", getParentFolders);
router.get("/byParent/:parent_id", getByParentID);

export default router