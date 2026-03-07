import { Router } from "express";
import { analyze, loan_app_checker, upi_checker } from "../controller/analyze.controller.js";

const router = Router();


router.post("/analyze",analyze)
router.post("/upi_checker",upi_checker)
router.post("/loan-app-checker",loan_app_checker)

export default router;