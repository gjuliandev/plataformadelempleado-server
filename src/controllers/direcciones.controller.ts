import { Request, Response } from 'express';
import MySql from '../db/mysql';

export const getDireccion = (req: Request, res: Response ) =>  {

    const { idDireccion } = req.params;

    const query = `SELECT * FROM direcciones WHERE cliente_id = ${idDireccion} LIMIT 1`;

    MySql.ejecutarQuery(query, [], (err: any, direccion: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: direccion
        });
    });
}

export const postDireccion= (req: Request, res: Response ) =>  {

    const { body } = req;


    const query = 'INSERT INTO direcciones (domicilio, poblacion, provincia, codPostal, cliente_id) ' +
                   ' VALUES (?, ?, ?, ?, ?)';
    const campos = [body.domicilio, body.poblacion, body.provincia, body.codPostal, body.cliente_id ];

    MySql.ejecutarQuery(query, campos, (err: any, result: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: result
        });
    });
}

export const putDireccion = (req: Request, res: Response ) =>  {

    const { idDireccion } = req.params;
    const { body } = req;
    
    getDireccionByID(Number(idDireccion))
        .then( (oldDireccion: any) => {

            const domicilio = body.domicilio || oldDireccion[0].domicilio;
            const poblacion = body.poblacion || oldDireccion[0].poblacion;
            const provincia = body.provincia || oldDireccion[0].provincia;
            const codPostal = body.codPostal || oldDireccion[0].codPostal;
            
            const query = `UPDATE direcciones SET domicilio = ?, poblacion =  ?, provincia =  ?, codPostal =  ? WHERE _id = ${idDireccion}`;
            const campos = [domicilio, poblacion, provincia, codPostal]
            MySql.ejecutarQuery(query, campos, (err: any, result: any) => {
                if (err) {
                    return res.status(400).json( {
                        msg: 'Error en la actualización: ' + err ,
                        ok: true,
                        idDireccion,
                        body
                    } );
                }

                return res.status(200).json({
                    msj: 'Se ha actualizado la dirección',
                    result
                });

            });
        })
        .catch ((err: any )=> {
            res.status(400).json( {
                msg: 'Error en la actualización: ' + err ,
                ok: true,
                idDireccion,
                body
            } );
        });

   
}

export const deleteDireccion = (req: Request, res: Response ) =>  {
    
    const { idDireccion } = req.params;

    const query = `DELETE FROM direcciones WHERE _id = ${idDireccion}`;

    MySql.ejecutarQuery(query, [], (err: any, result: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: result
        });
    });
}

const getDireccionByID = async (id: number) => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT * FROM direcciones WHERE _id = ${id}`;
        MySql.ejecutarQuery(query, [], (err: any, direccion: any) => {
            if (err) {
                reject(err);
            }
            resolve(direccion);
        });
    });
}