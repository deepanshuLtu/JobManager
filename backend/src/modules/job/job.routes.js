import express from "express";

import {
  create,
  getAdminAll,
  getAll,
  getOne,
  update,
  remove,
} from "./job.controller.js";
import {
  validateCreateJob,
  validateJobIdParam,
  validateUpdateJob,
} from "./job.validation.js";

import { protect } from "../../middleware/auth.middleware.js";
import { adminOnly } from "../../middleware/admin.middleware.js";

const router = express.Router();

router.get("/admin/all", protect, adminOnly, getAdminAll);

router.get("/", getAll);

router.get("/:id", validateJobIdParam, getOne);

router.post("/", protect, adminOnly, validateCreateJob, create);

router.put("/:id", protect, adminOnly, validateJobIdParam, validateUpdateJob, update);

router.delete("/:id", protect, adminOnly, validateJobIdParam, remove);

export default router;
