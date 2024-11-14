import { Router } from "express";
import { getContendor } from "../controllers/contenedores.controller";

const routes = Router();

routes.get("/:contenedor_id", getContendor);

export default routes;
