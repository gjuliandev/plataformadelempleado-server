import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { getFile, uploadFile } from '../controllers/files.controller';

const routes = Router();
const pathUploads = path.join(__dirname, '../assets/uploads/tmp');
const upload = multer({ dest: pathUploads });

routes.get ( '/:tipo/:fichero', getFile    );
routes.put ( '/:tipo/:id', upload.single('fichero'), uploadFile );

export default routes;