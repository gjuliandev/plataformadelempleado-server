import { Router } from 'express';
import { deleteContacto, getContactosByCliente, postContacto, putContacto } from '../controllers/contacto.controller';
import { getEmpleado, getEmpleados, postEmpleado } from '../controllers/empleados.controller';

const routes = Router();

routes.get    ( '/:idEmpledo',  getEmpleado    );
routes.get    ( '/',            getEmpleados    );
routes.post   ( '/'           , postEmpleado   );
routes.put    ( '/:idEmpledo',  putContacto    );
routes.delete ( '/:idEmpledo',  deleteContacto );

export default routes;