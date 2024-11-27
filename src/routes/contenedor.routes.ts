import { Router } from "express";
import { getContendor, getUnidadesByContadorContenedor } from "../controllers/contenedores.controller";

const routes = Router();

routes.get("/unidades-tipo-contador/:contenedor_id/:tipo_id", getUnidadesByContadorContenedor);
routes.get("/:contenedor_id", getContendor);

export default routes;
