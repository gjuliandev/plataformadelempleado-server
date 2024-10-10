import { Router } from 'express';

import { getAccesos, getAccesosByEmpleado, postAcceso } from '../controllers/accesos.controller';

const routes = Router();

// routes.get    ( '/',    getUsuarios   );
routes.get    ( '/:empleado_id/empleado', getAccesosByEmpleado);
routes.post   ( '/',    postAcceso   );
// routes.put    ( '/:id', putUsuario    );
// routes.delete ( '/:id', deleteUsuario );

export default routes;