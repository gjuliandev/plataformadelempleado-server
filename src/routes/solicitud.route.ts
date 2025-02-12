import { Router } from "express";
import {
  deleteSolicitud,
  getSolicitud,
  getSolicitudesByContenedor,
  getSolicitudesByEmpleado,
  getStatusSolicitud,
  getTiposSolicitud,
  getTiposSolicitudByBolsaEmpleado,
  getTiposSolicitudByContenedor,
  postSolicitud,
  rechazarSolicitud,
  updateResolucion,
  validarSolicitud,
} from "../controllers/solicitudes.controller";

const routes = Router();

routes.get("/status-solicitud", getStatusSolicitud);
routes.get("/tipos-solicitud/:contenedor_id", getTiposSolicitudByContenedor);
routes.get("/tipos-solicitud-bolsa/:empleado_id", getTiposSolicitudByBolsaEmpleado);
routes.get("/tipos-solicitud", getTiposSolicitud);
routes.get("/:contenedor_id/contenedor", getSolicitudesByContenedor);
routes.get("/:empleado_id/empleado", getSolicitudesByEmpleado);
routes.get("/:solicitud_id", getSolicitud);
routes.patch("/:solicitud_id/rechazar", rechazarSolicitud);
routes.patch("/:solicitud_id/resolucion", updateResolucion);
routes.post("/", postSolicitud);
routes.patch("/:solicitud_id/validar", validarSolicitud);

routes.delete("/:solicitud_id", deleteSolicitud);

export default routes;
