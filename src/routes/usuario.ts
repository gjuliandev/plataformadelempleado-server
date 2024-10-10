import { Router } from 'express';

import { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios.controller';

const routes = Router();

routes.get    ( '/',    getUsuarios   );
routes.get    ( '/:id', getUsuario    );
routes.post   ( '/',    postUsuario   );
routes.put    ( '/:id', putUsuario    );
routes.delete ( '/:id', deleteUsuario );

export default routes;