import express from 'express';
const router = express.Router();
import  {getByParentID, getFolderStructure, getParentFolders} from '../controllers/folder.controller.js';

router.get("/", getFolderStructure);
router.get("/parentsFolders", getParentFolders);
router.get("/byParent/:parent_id", getByParentID);
export default router