import { Router } from 'express';
import { deleteContacto, getContactosByCliente, postContacto, putContacto } from '../controllers/contacto.controller';

const routes = Router();

routes.get    ( '/:idContacto', getContactosByCliente    );
routes.post   ( '/'           , postContacto   );
routes.put    ( '/:idContacto', putContacto    );
routes.delete ( '/:idContacto', deleteContacto );

export default routes;