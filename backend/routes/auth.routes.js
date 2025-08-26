import express from "express";
import {
  login,
  register,
  updateProfile,
  deleteProfile,
  deleteThis,
  logout,
  getUsersAdmin,
} from "../controllers/auth.controller.js";
import {
  loginSchema,
  registerSchema,
  patchUserSchema,
} from "../schemas/auth.schema.js";
import validateSchema from "../middlewares/validateSchema.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();


router.post("/login", validateSchema(loginSchema), login);
router.post("/register", validateSchema(registerSchema), register);


router.get("/profile", authenticate, authorize("viewUsers"), getUsersAdmin);

router.patch(
  "/profile",
  authenticate,
  authorize("updateUser"),
  validateSchema(patchUserSchema),
  updateProfile
);

router.patch(
  "/lowuser",
  authenticate,
  authorize("disableUser"),
  validateSchema(patchUserSchema),
  updateProfile
);

router.delete(
  "/delete",
  authenticate,
  authorize("deleteUser"),
  deleteProfile
);

router.delete(
  "/delete/:id",
  authenticate,
  authorize("deleteSelf"),
  deleteThis
);

router.post("/logout", authenticate, authorize("logout"), logout);

router.post("/tokenchk", authenticate, authorize("tokenCheck"), () => {
  console.log("Token válido");
});

export default router;
