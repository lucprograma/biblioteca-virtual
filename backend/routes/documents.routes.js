import express from "express";
import {
  getAllDocuments,
  getByTag,
  fetchByParent,
  createDocument,
} from "../controllers/documents.controller.js";
import upload from "../config/multerConfig.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.use(authenticate);

router.get("/", authorize("viewDocuments"), getAllDocuments);
router.get("/find_tag/:tag", authorize("viewDocumentsByTag"), getByTag);
router.get("/findByFolder/:folder_id", authorize("viewDocumentsByFolder"), fetchByParent);
router.post("/createDocument", authorize("createDocument"), upload.single("file"), createDocument);

export default router;
