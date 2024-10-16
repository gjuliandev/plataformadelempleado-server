import { Router } from 'express';
import { getEmpleado, getEmpleados, postEmpleado, putEmpleado } from '../controllers/empleados.controller';

const routes = Router();

routes.get    ( '/:empleado_id',    getEmpleado    );
routes.get    ( '/',                getEmpleados    );
routes.post   ( '/'           ,     postEmpleado   );
routes.put    ( '/:empleado_id',    putEmpleado    );
// routes.delete ( '/:empleado_id',    deleteContacto );

export default routes;