import { Router } from 'express';

import { getFichajesByEmpleado, getTiempoTrabajo, postFichaje } from '../controllers/fichajes.controller';
import { getAccesos } from '../controllers/accesos.controller';

const routes = Router();

// routes.get    ( '/',    getUsuarios   );
routes.get    ( '/:empleado_id/:fecha/tiempo', getTiempoTrabajo);
routes.get    ( '/:empleado_id/empleado', getFichajesByEmpleado);
routes.get    ( '/:id/accesos', getAccesos);
routes.post   ( '/',    postFichaje   );
// routes.put    ( '/:id', putUsuario    );
// routes.delete ( '/:id', deleteUsuario );

export default routes;