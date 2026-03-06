import { Router } from "express";
import { analyze } from "../controller/analyze.controller.js";

const router = Router();


router.post("/analyze",analyze)


export default router;