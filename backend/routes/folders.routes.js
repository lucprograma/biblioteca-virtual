import  {getByParentID, getFolderStructure, getParentFolders} from '../controllers/folder.controller.js';

import express from 'express';
const router = express.Router();


router.get("/", getFolderStructure);
router.get("/parentsFolders", getParentFolders);
router.get("/byParent/:parent_id", getByParentID);
export default router