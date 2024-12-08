import { Router } from "express";
import {
  cambiarEstado,
  getContadoresByEmpleado,
  getEmpleado,
  getEmpleadosByContenedor,
  getContadoresByBolsaEmpleado,
  getNumUnidadesBySolicitud,
  postEmpleado,
  putEmpleado,
} from "../controllers/empleados.controller";

const routes = Router();

routes.get("/bolsa-horas-empleado/:empleado_id/", getContadoresByBolsaEmpleado);
routes.get("/contadores/:empleado_id", getContadoresByEmpleado);
routes.get("/contenedor/:contenedor_id", getEmpleadosByContenedor);
routes.get("/:empleado_id/unidades-by-solicitud/:tipo_solicitud", getNumUnidadesBySolicitud);
routes.get("/:empleado_id", getEmpleado);
routes.post("/", postEmpleado);
routes.put("/:empleado_id", putEmpleado);
routes.patch("/:empleado_id/cambiar-estado", cambiarEstado);

// routes.delete ( '/:empleado_id',    deleteContacto );

export default routes;
