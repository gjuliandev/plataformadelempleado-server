import { Router } from 'express';
import { deleteDireccion, getDireccion, postDireccion, putDireccion } from '../controllers/direcciones.controller';

const routes = Router();

routes.get    ( '/:idDireccion', getDireccion    );
routes.post   ( '/',    postDireccion   );
routes.put    ( '/:idDireccion', putDireccion    );
routes.delete ( '/:idDireccion', deleteDireccion );

export default routes;