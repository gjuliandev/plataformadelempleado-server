import { Router } from "express";
import { getEmpleado, getEmpleados, getEmpleadosByContenedor, postEmpleado, putEmpleado } from "../controllers/empleados.controller";

const routes = Router();

routes.get("/:empleado_id", getEmpleado);
routes.get("/contenedor/:contenedor_id", getEmpleadosByContenedor);
routes.post("/", postEmpleado);
routes.put("/:empleado_id", putEmpleado);
// routes.delete ( '/:empleado_id',    deleteContacto );

export default routes;
