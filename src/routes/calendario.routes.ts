import { Router } from "express";
import {
  assignCalendarToEmpleados,
  createEventoByContenedor,
  deleteDiaFestivo,
  deleteEventoByContenedor,
  getCalendariosByContendor,
  getCalendariosByEmpleado,
  getCalendariosWithDiasFestivosByContenedor,
  getDiasFestivosByCalendario,
  getDiasFestivosByEmpleado,
  getEventosByContenedor,
  postCalendario,
  postDiaFestivo,
  putDiaFestivo,
  removeAssignCalendarToEmpleado,
} from "../controllers/calendarios.controller";

const routes = Router();
routes.get("/eventos/:contenedor_id", getEventosByContenedor);

routes.get("/calendarios/empleado/:empleado_id", getCalendariosByEmpleado);
routes.get("/calendariosWithFestivos/:contenedor_id", getCalendariosWithDiasFestivosByContenedor);
routes.get("/contenedor/:contenedor_id", getCalendariosByContendor);
routes.get("/empleado/:empleado_id", getDiasFestivosByEmpleado);
routes.get("/calendario/:calendario_id", getDiasFestivosByCalendario);

routes.post("/", postCalendario);
routes.post("/dia-festivo", postDiaFestivo);
routes.put("/dia-festivo", putDiaFestivo);
routes.delete("/dia-festivo/:dia_festivo_id", deleteDiaFestivo);

routes.post("/assign-calendar", assignCalendarToEmpleados);
routes.delete("/remove-assign-calendar", removeAssignCalendarToEmpleado);

routes.post("/eventos", createEventoByContenedor);
routes.delete("/eventos/:evento_id", deleteEventoByContenedor);

export default routes;
