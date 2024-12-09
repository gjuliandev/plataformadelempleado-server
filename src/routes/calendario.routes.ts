import { Router } from 'express';
import { getCalendariosByContendor, getDiasFestivosByCalendario, getDiasFestivosByEmpleado, postCalendario } from '../controllers/calendarios.controller';

const routes = Router();

routes.get    ( '/contenedor/:contenedor_id', getCalendariosByContendor);
routes.get    ( '/empleado/:empleado_id',     getDiasFestivosByEmpleado);
routes.get    ( '/calendario/:calendario_id', getDiasFestivosByCalendario);
routes.post   ( '/',                          postCalendario);


export default routes;