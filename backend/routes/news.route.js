import express from "express";
import {
  addNews,
  deleteNews,
  updateNews,
  getNews,
} from "../controllers/news.controller.js";
import { newsSchema } from "../schemas/news.schema.js";
import validateSchema from "../middlewares/validateSchema.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.get("/", authenticate, authorize("viewNews"), getNews);

router.post(
  "/",
  authenticate,
  authorize("createNews"),
  validateSchema(newsSchema),
  addNews
);

router.delete(
  "/delete",
  authenticate,
  authorize("deleteNews"),
  deleteNews
);

router.patch(
  "/update",
  authenticate,
  authorize("updateNews"),
  validateSchema(newsSchema),
  updateNews
);

export default router;
