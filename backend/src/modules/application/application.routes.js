import express from "express";

import { protect } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../../middleware/admin.middleware.js";

import {
  apply,
  getMine,
  getAll,
  updateStatus,
} from "./application.controller.js";

const router = express.Router();

router.post("/", protect, apply);

router.get("/me", protect, getMine);

router.get("/", protect, adminOnly, getAll);

router.put("/:id/status", protect, adminOnly, updateStatus);

export default router;
