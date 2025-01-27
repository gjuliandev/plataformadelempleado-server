import { Router } from "express";
import { getContadoresByContenedor, getContadoresByContenedorAndTipo, getContendor, getUnidadesMedida, postTipoSolicitud, putContenedor, putTipoSolicitud } from "../controllers/contenedores.controller";

const routes = Router();

routes.get("/unidades-contador/:contenedor_id/", getContadoresByContenedor);
routes.get("/:contenedor_id/unidades-tipo-contador/:tipo_id/", getContadoresByContenedorAndTipo);


routes.get("/unidades-tipo-contador/:contenedor_id/", getContadoresByContenedor);
routes.get("/contadores/unidades-medida", getUnidadesMedida);
routes.get("/:contenedor_id", getContendor);
routes.put("/:contenedor_id", putContenedor);
routes.put("/contador/:contador_id", putTipoSolicitud);
routes.post("/contador/", postTipoSolicitud);

export default routes;
