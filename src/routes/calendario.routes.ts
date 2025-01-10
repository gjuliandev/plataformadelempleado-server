import { Router } from 'express';
import { getCalendariosByContendor, getDiasFestivosByCalendario, getDiasFestivosByEmpleado, postCalendario, postDiaFestivo } from '../controllers/calendarios.controller';

const routes = Router();

routes.get    ( '/contenedor/:contenedor_id', getCalendariosByContendor);
routes.get    ( '/empleado/:empleado_id',     getDiasFestivosByEmpleado);
routes.get    ( '/calendario/:calendario_id', getDiasFestivosByCalendario);
routes.post   ( '/',                          postCalendario);
routes.post   ( '/dia-festivo',               postDiaFestivo);


export default routes;