import { Router } from "express";
import { getContadoresByContenedor, getContendor } from "../controllers/contenedores.controller";

const routes = Router();

routes.get("/unidades-tipo-contador/:contenedor_id/", getContadoresByContenedor);
routes.get("/:contenedor_id", getContendor);

export default routes;
