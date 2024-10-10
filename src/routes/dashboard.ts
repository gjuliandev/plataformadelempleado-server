import { Router } from 'express';
import { getKilosMes, getKilosRestaurante, getVisitasByAnio } from '../controllers/dashboard.controller';

const routes = Router();

routes.get ( '/kilosxmes',         getKilosMes         );
routes.get ( '/kilosxrestuarante', getKilosRestaurante );
routes.get ( '/visitasxanio',      getVisitasByAnio    );


export default routes;