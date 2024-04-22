import express from "express";
import {
  welcomeRoute,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", welcomeRoute);

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
