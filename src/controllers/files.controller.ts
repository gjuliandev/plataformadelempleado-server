import { Request, Response } from 'express';
import fs   from 'fs';
import path from 'path';

import FileSystem from '../classes/file-system';

const fileSystem = new FileSystem();

export const getFile  = async (req: Request, res: Response) => {
    const { tipo, fichero } = req.params;
    
    let pathFile = fileSystem.getFileUrl(tipo, fichero);

    if (!fs.existsSync(pathFile) ) {
        pathFile = path.resolve(__dirname, '../assets/', 'no-img.jpg');
    }

    res.sendFile(path.resolve(pathFile));
}


export const uploadFile = async (req: Request, res: Response) => {
    const { tipo, id } = req.params;
    
    if (!req.file) {
        return res.status(400).json({
            msg: 'No se ha subido ningun fichero'
        });
    }

    const file: any = req.file;

    if(!file){
        return res.status(400).json({
            msg: 'No se ha subido ningun fichero - image'
        });
    }

    await fileSystem.guardarFichero(file, Number(id), tipo)
        .then( () => {
            res.status(200).json({
                file,
                id,
                tipo
            });
        })
        .catch( () => {
           
            res.status(400).json({
                msg: 'No se ha guardado correctamente',
                file,
                id,
                tipo
            });
        });
}