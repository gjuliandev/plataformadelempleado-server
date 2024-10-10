import { Router } from 'express';
import { login, resetPasword } from '../controllers/auth.controller';

const routes = Router();

routes.post ( '/login',             login       );
routes.put  ( '/resetPassword/:id', resetPasword);

export default routes;