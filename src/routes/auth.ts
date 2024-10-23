import { Router } from "express";
import { login, resetPasword } from "../controllers/auth.controller";

const routes = Router();

routes.post("/login", login);
routes.patch("/reset-password/:empleado_id", resetPasword);

export default routes;
