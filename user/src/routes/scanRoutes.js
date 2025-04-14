import express from "express";
import { validate } from "../middleware/validationMiddleware.js";
import {
  validateCreateScan,
  validateGetScan,
  validateUpdateScan,
  validateDeleteScan,
} from "../validation/scan/index.js";
import { createScan, getScan } from "../controllers/scanController.js";
const router = express.Router();

router.route("/").post(validate(validateCreateScan), createScan);
// router.route("/get").post(validate(validateGetScan), getScan);
// router.route("/update").patch(validate(validateUpdateScan), updateScan);
// router.route("/delete/:id").delete(validateDeleteScan, deleteScan);

export default router;
