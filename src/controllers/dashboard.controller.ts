import { Request, Response } from 'express';
import MySql from '../db/mysql';


export const getKilosMes = (req: Request, res: Response ) =>  {

    const query = ` 
                    SELECT MONTHNAME(r.fecha) AS mes, SUM(kilos) AS kilos, SUM(entregado) AS entregado FROM rutas r
                    INNER JOIN visitas v
                    ON r._id = v.ruta_id
                    WHERE r.fecha <= CURDATE() AND YEAR(CURDATE())
                    GROUP BY MONTHNAME(r.fecha)
                    ORDER BY MONTH(r.fecha)`;    

    MySql.ejecutarQuery(query, [], (err: any, data: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: data
        });
    });
}

export const getKilosRestaurante = (req: Request, res: Response ) =>  {

   
    const query = `SELECT c.nombreComercial AS restaurante, YEAR(r.fecha), SUM(kilos) AS kilos, SUM(entregado) AS entregado,  COUNT(*) AS nVisitas  FROM rutas r
                    INNER JOIN visitas v
                    ON r._id = v.ruta_id
                    INNER JOIN clientes c
                    ON c._id = v.cliente_id
                    WHERE r.fecha <= CURDATE() AND YEAR(CURDATE()) 
                    GROUP BY YEAR(r.fecha), c.nombreComercial
                    ORDER BY kilos DESC`;

    MySql.ejecutarQuery(query, [], (err: any, data: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: data
        });
    });
}

export const getVisitasByAnio = (req: Request, res: Response ) =>  {
 

    const query = `SELECT * from rutas r 
                    INNER JOIN visitas v
                    ON r._id = v.ruta_id
                    WHERE YEAR(CURDATE())`;


    MySql.ejecutarQuery(query, [], (err: any, data: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: data
        });
    });
}
