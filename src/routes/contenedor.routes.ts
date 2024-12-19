import { Router } from "express";
import { getContadoresByContenedor, getContadoresByContenedorAndTipo, getContendor, putContenedor } from "../controllers/contenedores.controller";

const routes = Router();

routes.get("/unidades-contador/:contenedor_id/", getContadoresByContenedor);
routes.get("/:contenedor_id/unidades-tipo-contador/:tipo_id/", getContadoresByContenedorAndTipo);
routes.get("/:contenedor_id", getContendor);
routes.put("/:contenedor_id", putContenedor);

export default routes;
