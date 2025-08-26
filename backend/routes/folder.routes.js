import express from "express";
import {
  getByParentID,
  getFolderStructure,
  getParentFolders,
} from "../controllers/folder.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.use(authenticate);

router.get("/", authorize("viewFolders"), getFolderStructure);
router.get("/parentsFolders", authorize("viewParentFolders"), getParentFolders);
router.get("/byParent/:parent_id", authorize("viewFoldersByParent"), getByParentID);

export default router;
