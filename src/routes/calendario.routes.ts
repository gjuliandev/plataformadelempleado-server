import { Router } from 'express';
import { assignCalendarToEmpleados, getCalendariosByContendor, getDiasFestivosByCalendario, getDiasFestivosByEmpleado, postCalendario, postDiaFestivo, removeAssignCalendarToEmpleado } from '../controllers/calendarios.controller';

const routes = Router();

routes.get    ( '/contenedor/:contenedor_id', getCalendariosByContendor);
routes.get    ( '/empleado/:empleado_id',     getDiasFestivosByEmpleado);
routes.get    ( '/calendario/:calendario_id', getDiasFestivosByCalendario);
routes.post   ( '/',                          postCalendario);
routes.post   ( '/dia-festivo',               postDiaFestivo);
routes.post   ('/assign-calendar',            assignCalendarToEmpleados);
routes.delete ('/remove-assign-calendar',     removeAssignCalendarToEmpleado);


export default routes;