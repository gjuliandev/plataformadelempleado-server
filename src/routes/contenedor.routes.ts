import { Router } from "express";
import { getContadoresByContenedor, getContendor, getUnidadesMedida, postTipoSolicitud, putContenedor } from "../controllers/contenedores.controller";

const routes = Router();

routes.get("/unidades-tipo-contador/:contenedor_id/", getContadoresByContenedor);
routes.get("/contadores/unidades-medida", getUnidadesMedida);
routes.get("/:contenedor_id", getContendor);
routes.put("/:contenedor_id", putContenedor);
routes.post("/contador/", postTipoSolicitud);

export default routes;
