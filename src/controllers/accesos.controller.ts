import { Request, Response } from 'express';
import MySql from '../db/mysql';


export const getAccesos = (req: Request, res: Response) => {

    const query = 'SELECT * FROM accesos WHERE Date(fecha) = Date(Now()) ORDER BY id DESC';

    MySql.ejecutarQuery(query, [], (err: any, accesos: any) => {
        if (err) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: accesos
        });
    });
}

export const getAccesosByEmpleado = (req: Request, res: Response) => {

    const { empleado_id } = req.params;

    const query = `SELECT * FROM accesos 
                    WHERE empleado_id = ${empleado_id} AND DATE(fecha) = DATE(NOW())
                    ORDER BY fecha DESC`;

    MySql.ejecutarQuery(query, [], (err: any, fichajes: any) => {
        if (err) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: fichajes
        });
    });
}

export const getAcceso = (req: Request, res: Response) => {

    const { id } = req.params;

    const query = `SELECT * FROM accesos WHERE id = ${id} LIMIT 1`;

    MySql.ejecutarQuery(query, [], (err: any, accesos: any) => {
        if (err) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: accesos
        });
    });
}

export const postAcceso = (req: Request, res: Response) => {

    const { body } = req;

    const query = 'INSERT INTO accesos (source_id, empleado_id, tipo_acceso, fecha, comentarios) VALUES (?, ?, ?, ?, ?)';
    const campos = [body.source_id, body.empleado_id, body.tipo_acceso, body.fecha, body.comentarios];

    // tipo_acceso = 1 Entrada, 2 Salida;
    // source_id = 1 movil 2 tablet 3 web 4 auto

    MySql.ejecutarQuery(query, campos, (err: any, result: any) => {
        if (err) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: result
        });
    });
}


const getAccesoById = async (id: number) => {

    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM accesos WHERE id = ${id}`;
        MySql.ejecutarQuery(query, [], (err: any, acceso: any) => {
            if (err) {
                reject(err);
            }
            resolve(acceso);
        });
    });
}
