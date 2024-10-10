import { Router } from 'express';

import { getCliente, getClientes, postCliente, putCliente, deleteCliente, getClientesPlanificacion, activar, desactivar, addToPlanificacion} from '../controllers/clientes.controller';

const routes = Router();

routes.get    ( '/',                     getClientes              );
routes.get    ( '/planificacion/:fecha', getClientesPlanificacion );
routes.get    ( '/:id',                  getCliente               );
routes.post   ( '/',                     postCliente              );
routes.put    ( '/:id',                  putCliente               );
routes.get    ( '/activar/:id',          activar                  );
routes.get    ( '/planificar/:id',       addToPlanificacion       );
routes.get    ( '/desactivar/:id',       desactivar               );
routes.delete ( '/:id',                  deleteCliente            );

export default routes;