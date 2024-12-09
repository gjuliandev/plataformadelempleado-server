import { Request, Response } from 'express';
import MySql from '../db/mysql';


export const getCalendariosByContendor = (req: Request, res: Response ) =>  {

    const { contenedor_id } = req.params;

    const query = `SELECT cal.id AS calendario_id, cal.nombre AS calendario, cal.isGeneral, cal.color 
                    FROM calendarios cal
                    INNER JOIN contenedores c
                    ON c.id = cal.contenedor_id
                    WHERE cal.contenedor_id = ${contenedor_id}`;

    MySql.ejecutarQuery(query, [], (err: any, contacto: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: contacto
        });
    });
}

export const getDiasFestivosByCalendario = (req: Request, res: Response ) =>  {

    const {calendario_id } = req.params;

    const query = `SELECT cal.id AS calendario_id, cal.nombre, cal.isGeneral, cal.color, df.id AS dia_id, df.fecha, df.comentario 
                    FROM calendarios cal
                    INNER JOIN dias_festivos df
                    ON cal.id = df.calendario_id
                    WHERE cal.id = ${calendario_id}`;

    MySql.ejecutarQuery(query, [], (err: any, contacto: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: contacto
        });
    });
}



export const getDiasFestivosByEmpleado = (req: Request, res: Response ) =>  {

    const { empleado_id  } = req.params;

    const query = `SELECT df.id AS dia_id, df.fecha, df.comentario, cal.id AS calendario_id, cal.nombre AS calendario, cal.isGeneral, cal.color
                    FROM contenedores c
                    INNER JOIN calendarios cal
                    ON c.id = cal.contenedor_id
                    INNER JOIN dias_festivos df
                    ON cal.id = df.calendario_id
                    WHERE cal.isGeneral = 1 AND c.id = (SELECT c1.id FROM contenedores c1 INNER JOIN empleados e1 ON e1.contenedor_id = c1.id WHERE e1.id = ${empleado_id})
                    UNION
                    SELECT df.id AS dia_id, df.fecha, df.comentario, cal.id AS calendario_id, cal.nombre AS calendario, cal.isGeneral
                    FROM empleados e
                    INNER JOIN calendarios_empleado ce
                    ON e.id = ce.empleado_id
                    INNER JOIN calendarios cal
                    ON cal.id = ce.calendario_id
                    INNER JOIN dias_festivos df
                    ON cal.id = df.calendario_id
                    WHERE e.id = ${empleado_id} AND 
                    cal.contenedor_id = (SELECT c.id FROM contenedores c INNER JOIN empleados e ON e.contenedor_id = c.id WHERE e.id = ${empleado_id})`;

    MySql.ejecutarQuery(query, [], (err: any, contacto: any) => {
        if ( err ) {
            return res.status(400).json({
                msg: err
            });
        }

        res.status(200).json({
            payload: contacto
        });
    });
}

export const postCalendario = (req: Request, res: Response) => {
    const { body } = req;
  
    const codigo = body.codigo || "";
    const apellido1 = body.apellido1 || "";

};