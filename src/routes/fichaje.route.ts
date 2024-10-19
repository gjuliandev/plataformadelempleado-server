import { Router } from "express";

import { getFichajesByEmpleado, getTiempoTrabajo, postFichaje, getFichajesByContenedor, putFichaje } from "../controllers/fichajes.controller";
import { getAccesos } from "../controllers/accesos.controller";

const routes = Router();

// routes.get    ( '/',    getUsuarios   );
routes.get("/:empleado_id/:fecha/tiempo", getTiempoTrabajo);
routes.get("/:empleado_id/empleado", getFichajesByEmpleado);
routes.get("/:contenedor_id/contenedor", getFichajesByContenedor);
routes.get("/:id/accesos", getAccesos);
routes.post("/", postFichaje);
routes.put("/:fichaje_id", putFichaje);
// routes.delete ( '/:id', deleteUsuario );

export default routes;
