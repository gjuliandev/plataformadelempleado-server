import path from 'path';
import fs   from 'fs';
import { actualizarAvatar } from '../controllers/usuarios.controller';
import { actualizarLogo } from '../controllers/clientes.controller';

class FileSystem {

    constructor() { }

    getFileUrl(tipo: string, nombre: string) {
        const pathFile = path.resolve(__dirname, '../assets/uploads/', tipo, nombre);
        return pathFile;
    }

    guardarFichero(file: any, id: number = 0, tipo: string='') {
        return new Promise<void>( (resolve,reject) => {
            let carpeta = '';
            const parseName =  file.originalname.split('.');
            const extension = parseName[ parseName.length - 1];
            const nuevoNombre = `${file.filename}.${extension}`;
            
            switch(tipo) {
                case 'avatar': 
                    carpeta = this.crearCarpetas('avatar');
                    actualizarAvatar(id, nuevoNombre);
                    break;
                case 'logo': 
                    carpeta = this.crearCarpetas('logos');
                    actualizarLogo(id, nuevoNombre);
                    break;
                default:
                   
                    break;
            }
           
            fs.rename(file.path, `${carpeta}/${nuevoNombre}` , (err) => {
                if (err) { 
                    reject(err);
                }
                resolve();
            });
        });
    }

    private crearCarpetas(tipo: string) {
        const pathUploads = path.resolve(__dirname, '../assets/uploads/', tipo);
        const existe      = fs.existsSync(pathUploads);

        if (!existe) {
            try {
                fs.mkdirSync(pathUploads, { recursive: true });
            } catch (error ){
                return pathUploads;
            }
           
        } 
        
        return pathUploads;
    }

}

export default FileSystem;