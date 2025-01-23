import { Router } from "express";
import {
  assignCalendarToEmpleados,
  deleteDiaFestivo,
  getCalendariosByContendor,
  getCalendariosWithDiasFestivosByContenedor,
  getDiasFestivosByCalendario,
  getDiasFestivosByEmpleado,
  postCalendario,
  postDiaFestivo,
  putDiaFestivo,
  removeAssignCalendarToEmpleado,
} from "../controllers/calendarios.controller";

const routes = Router();

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

export default routes;
