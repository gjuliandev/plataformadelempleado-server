import { Request, Response } from "express";
import MySql from "../db/mysql";

export const getCalendariosByContendor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;

  const query = `SELECT cal.id AS calendario_id, cal.nombre AS calendario, cal.isGeneral, cal.color 
                    FROM calendarios cal
                    INNER JOIN contenedores c
                    ON c.id = cal.contenedor_id
                    WHERE cal.contenedor_id = ${contenedor_id}`;

  MySql.ejecutarQuery(query, [], (err: any, contacto: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: contacto,
    });
  });
};

export const getDiasFestivosByCalendario = (req: Request, res: Response) => {
  const { calendario_id } = req.params;

  const query = `SELECT cal.id AS calendario_id, cal.nombre, cal.isGeneral, cal.color, df.id AS dia_id, df.fecha, df.comentario
                    FROM calendarios cal
                    INNER JOIN dias_festivos df
                    ON cal.id = df.calendario_id
                    WHERE cal.id = ${calendario_id}`;

  MySql.ejecutarQuery(query, [], (err: any, contacto: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: contacto,
    });
  });
};

export const getDiasFestivosByEmpleado = (req: Request, res: Response) => {
  const { empleado_id } = req.params;

  const query = `SELECT df.fecha AS fecha FROM calendarios c
                INNER JOIN dias_festivos df
                ON c.id = df.calendario_id
                WHERE c.isGeneral = 1 
                OR c.id IN (SELECT c1.id FROM calendarios_empleado ce
                    INNER JOIN calendarios c1
                    ON c1.id = ce.calendario_id
                    INNER JOIN empleados e
                    ON e.id = ce.empleado_id
                    WHERE e.id = ${empleado_id})`;

  MySql.ejecutarQuery(query, [], (err: any, fechas: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: fechas,
    });
  });
};

export const postCalendario = (req: Request, res: Response) => {
  const { body } = req;

  const query = `INSERT INTO  calendarios (nombre, color, isGeneral, contenedor_id)
                  VALUES (?, ?, ?, ?)`;

  const campos = [body.nombre, body.color, body.isGeneral, body.contenedor_id];

  MySql.ejecutarQuery(query, campos, (err: any, fechas: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: fechas,
    });
  });
  
};
