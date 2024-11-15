import { Router } from "express";
import { sendEmail } from "../controllers/email.controller";

const router = Router();

router.post("/send", sendEmail); // creamos y enviamos un email

export default router;
