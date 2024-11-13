import { Router } from "express";
import {
  deleteSolicitud,
  getSolicitud,
  getSolicitudesByContenedor,
  getSolicitudesByEmpleado,
  getStatusSolicitud,
  getTiposSolicitud,
  postSolicitud,
  rechazarSolicitud,
  validarSolicitud,
} from "../controllers/solicitudes.controller";

const routes = Router();

routes.get("/status-solicitud", getStatusSolicitud);
routes.get("/tipos-solicitud", getTiposSolicitud);
routes.get("/:contenedor_id/contenedor", getSolicitudesByContenedor);
routes.get("/:empleado_id/empleado", getSolicitudesByEmpleado);
routes.get("/:solicitud_id", getSolicitud);

routes.post("/", postSolicitud);
routes.patch("/:solicitud_id/validar", validarSolicitud);
routes.patch("/:solicitud_id/rechazar", rechazarSolicitud);
routes.delete("/:solicitud_id", deleteSolicitud);

export default routes;
