import { Router } from "express";
import { deleteSolicitud, getSolicitud, getSolicitudesByContenedor, getSolicitudesByEmpleado, postSolicitud } from "../controllers/solicitudes.controller";

const routes = Router();

routes.get("/:contenedor_id/contenedor", getSolicitudesByContenedor);
routes.get("/:empleado_id/empleado", getSolicitudesByEmpleado);
routes.get("/:solicitud_id", getSolicitud);
routes.post("/", postSolicitud);
routes.delete("/:solicitud_id", deleteSolicitud);

export default routes;
