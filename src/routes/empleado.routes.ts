import { Router } from "express";
import { cambiarEstado, getEmpleado, getEmpleados, getEmpleadosByContenedor, getNumUnidadesBySolicitud, postEmpleado, putEmpleado } from "../controllers/empleados.controller";

const routes = Router();


routes.get("/contenedor/:contenedor_id", getEmpleadosByContenedor);
routes.get("/:empleado_id/unidades-by-solicitud/:tipo_solicitud", getNumUnidadesBySolicitud);
routes.get("/:empleado_id", getEmpleado);
routes.post("/", postEmpleado);
routes.put("/:empleado_id", putEmpleado);
routes.patch("/:empleado_id/cambiar-estado", cambiarEstado);


// routes.delete ( '/:empleado_id',    deleteContacto );

export default routes;
