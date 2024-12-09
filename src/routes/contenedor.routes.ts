import { Router } from "express";
import { getContadoresByContenedor, getContendor, putContenedor } from "../controllers/contenedores.controller";

const routes = Router();

routes.get("/unidades-tipo-contador/:contenedor_id/", getContadoresByContenedor);
routes.get("/:contenedor_id", getContendor);
routes.put("/:contenedor_id", putContenedor);

export default routes;
