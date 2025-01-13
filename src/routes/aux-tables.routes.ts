import { Router } from 'express';
import { getAuxUnidadesMedida } from '../controllers/aux-tables.controller';

const routes = Router();

routes.get( '/unidades-medida', getAuxUnidadesMedida);



export default routes;