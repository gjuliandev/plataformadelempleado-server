import { Request, Response } from 'express';
import MySql from '../db/mysql';
import path from 'path';
import fs from 'fs';

export const getClientes = (req: Request, res: Response ) =>  {

    const { abonado } = req.query;
    
    let query = '';
    if ( abonado === 'true') {
        query = `SELECT * FROM v_clientes WHERE abonado = ${abonado}`;
    } else  {
        query = `SELECT * FROM v_clientes`
    }
    

    MySql.ejecutarQuery(query, [], (err: any, clientes: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            count: clientes.length,
            payload: clientes
        });
    });
}

export const getCliente = (req: Request, res: Response ) =>  {

    const { id } = req.params;
    
    const query = `SELECT * FROM v_clientes WHERE _id = ${id} LIMIT 1`;

    MySql.ejecutarQuery(query, [], (err: any, cliente: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: cliente
        });
    });
}

export const getClientesPlanificacion = (req: Request, res: Response ) =>  {

    const { fecha } = req.params;
    const { mostrarTodos } = req.query;
    let query = '';

    if (mostrarTodos === 'false') {

        query = ` SELECT DISTINCT(c._id), c.nombreComercial, c.cantidad_abonada, c.periodicidad, c.consumo, c.ultima_visita, 
        c.proxima_visita, d.domicilio, d.poblacion, DATEDIFF(c.proxima_visita,  '${fecha}' ) AS restan
        FROM clientes c
        LEFT JOIN direcciones d
        ON c._id = d.cliente_id
        LEFT JOIN visitas v
        ON c._id = v.cliente_id
        LEFT JOIN rutas r
        ON r._id = v.ruta_id
        WHERE (abonado = 1)
        AND  (DATEDIFF(c.proxima_visita, '${fecha}') < 7) 
        AND ( c._id NOT IN (SELECT c1._id FROM clientes c1
            LEFT JOIN visitas v1
            ON c1._id = v1.cliente_id
            LEFT JOIN rutas r1
            ON r1._id = v1.ruta_id
            WHERE r1.estado = 0)
        )
        ORDER BY restan ASC`;
    } else {
        
        query = ` SELECT DISTINCT(c._id), c.nombreComercial, c.cantidad_abonada, c.periodicidad, c.consumo, c.ultima_visita, 
        c.proxima_visita, d.domicilio, d.poblacion, DATEDIFF(c.proxima_visita,  '${fecha}' ) AS restan
        FROM clientes c
        LEFT JOIN direcciones d
        ON c._id = d.cliente_id
        LEFT JOIN visitas v
        ON c._id = v.cliente_id
        LEFT JOIN rutas r
        ON r._id = v.ruta_id 
        WHERE  ( c._id NOT IN (SELECT c1._id FROM clientes c1
            LEFT JOIN visitas v1
            ON c1._id = v1.cliente_id
            LEFT JOIN rutas r1
            ON r1._id = v1.ruta_id
            WHERE r1.estado = 0)
        )
        ORDER BY restan ASC`;
    }
    
    

    MySql.ejecutarQuery(query, [], (err: any, clientes: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            count: clientes.length,
            payload: clientes
        });
    });
}

export const postCliente = (req: Request, res: Response ) =>  {

    const { body } = req;


    const query = 'INSERT INTO clientes (nombreComercial, nombreFiscal, siglas, cif, abonado, IBAN, notas, cantidad_abonada, periodicidad, consumo, fecha_alta, renovacion_certificado, usuario_id) ' +
                   ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    const campos = [body.nombreComercial, body.nombreFiscal, body.siglas, body.cif, body.abonado, body.IBAN, body.notas, body.cantidad_abonada, body.periodicidad, body.consumo, body.fecha_alta, body.renovacion_certificado, body.usuario_id ]
    
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

export const putCliente = (req: Request, res: Response ) =>  {

    const { id } = req.params;
    const { body } = req;
    
    getClienteById(Number(id))
        .then( (oldUser: any) => {

            const nombreComercial        = body.nombreComercial        || oldUser[0].nombreComercial;
            const nombreFiscal           = body.nombreFiscal           || oldUser[0].nombreFiscal;
            const siglas                 = body.siglas                 || oldUser[0].siglas;
            const cif                    = body.cif                    || oldUser[0].cif;
            const abonado                = body.abonado                || oldUser[0].abonado;
            const IBAN                   = body.IBAN                   || oldUser[0].IBAN;
            const notas                  = body.notas                  || oldUser[0].notas;
            const cantidad_abonada       = body.cantidad_abonada       || oldUser[0].cantidad_abonada;
            const periodicidad           = body.periodicidad           || oldUser[0].periodicidad;
            const consumo                = body.consumo                || oldUser[0].consumo;
            const fecha_alta             = body.fecha_alta             || oldUser[0].fecha_alta;
            const renovacion_certificado = body.renovacion_certificado || oldUser[0].renovacion_certificado;
            const usuario_id             = body.usuario_id             || oldUser[0].usuario_id;
            
            const query = `UPDATE clientes SET nombreComercial =  ?, nombreFiscal =  ?, siglas =  ?, cif =  ?, abonado =  ?,
                           IBAN = ?,  notas =  ?, cantidad_abonada =  ?, periodicidad = ?, consumo =  ?, fecha_alta =  ?, 
                           renovacion_certificado =  ?, usuario_id = ? WHERE _id = ${id}`;

            const campos = [ nombreComercial, nombreFiscal, siglas, cif, abonado, IBAN, notas, cantidad_abonada, periodicidad, consumo, fecha_alta, renovacion_certificado, usuario_id ];

            MySql.ejecutarQuery(query, campos, (err: any, result: any) => {
                if (err) {
                    return res.status(400).json( {
                        msg: 'Error en la actualización: ' + err ,
                        ok: true,
                        id,
                        body
                    } );
                }

                return res.status(200).json({
                    msj: 'Se ha actualizado el cliente'
                });

            });
        })
        .catch ((err: any )=> {
            res.status(400).json( {
                msg: 'Error en la actualización: ' + err ,
                ok: true,
                id,
                body
            } );
        });

   
}

export const deleteCliente = (req: Request, res: Response ) =>  {
    
    const { id } = req.params;

    const query = `DELETE FROM clientes WHERE _id = ${id}`;

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

export const actualizarLogo = (id: number, logo: string) => {
   
    eliminarLogo(id)
        .then( () => {
            const query = `UPDATE clientes SET logo =  '${logo}' WHERE _id = ${id}`;

            MySql.ejecutarQuery(query, [], (err: any, result: any) => {
                if (err) {
                    return (err);
                }
                return (result[0]);

            });
        })
        .catch( err => { 
            return (err) 
        });
   
    
} 

export const activar = (req: Request, res: Response ) =>  {
    
    const { id } = req.params;

    const query = `UPDATE clientes SET abonado = 1 WHERE _id = ${id}`;

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

export const desactivar = (req: Request, res: Response ) =>  {
    
    const { id } = req.params;

    const query = `UPDATE clientes SET abonado = 0 WHERE _id = ${id}`;

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

export const addToPlanificacion = (req: Request, res: Response)  => {
    
    const { id } = req.params;

    const query = `UPDATE clientes SET planificable = 1 WHERE _id = ${id}`;

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

const eliminarLogo =  (id: number) => {

    return new Promise( (resolve, reject) => {

        getClienteById(id)
            .then( (cliente: any)  => {
                const pathAntiguo = path.resolve(__dirname, '../assets/uploads/logos/', cliente[0].logo);
                if (fs.existsSync(pathAntiguo)) {
                    fs.unlink(pathAntiguo, (error) => { 
                        reject (error)
                    });
                }
                resolve(true)
              
            })
            .catch( error => {
                reject(error)
            });
    })
    
}

const getClienteById = async (id: number) => {

    return new Promise( (resolve, reject) => {
        const query = `SELECT * FROM clientes WHERE _id = ${id}`;
        MySql.ejecutarQuery(query, [], (err: any, cliente: any) => {
            if (err) {
                reject(err);
            }
            resolve(cliente);
        });
    });
}
