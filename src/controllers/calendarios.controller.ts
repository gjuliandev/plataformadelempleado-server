import { Request, Response } from "express";
import MySql from "../db/mysql";

export const getCalendariosByContendor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;

  const query = `SELECT cal.id AS calendario_id, cal.nombre AS calendario, cal.isGeneral, cal.color, cal.calendario_uuid
                    FROM calendarios cal
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

export const getCalendariosWithDiasFestivosByContenedor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;

  const query = `SELECT c.id, c.nombre as calendario, c.isGeneral, c.contenedor_id, c.color, c.calendario_uuid,
                    df.id as dia_festivo_id, df.fecha, df.comentario, df.calendario_id
                    FROM calendarios c
                    INNER JOIN dias_festivos df
                    ON c.id = df.calendario_id
                    WHERE c.contenedor_id = ${contenedor_id}`;

  console.log(query);

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

export const getFestivosByContenedor = (req: Request, res: Response) => {
  const { calendario_id } = req.params;

  const query = `SELECT cal.id AS calendario_id, cal.nombre, cal.isGeneral, cal.color, cal.calendario_uuid, df.id AS dia_id, df.fecha, df.comentario
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

export const getDiasFestivosByCalendario = (req: Request, res: Response) => {
  const { calendario_id } = req.params;

  const query = `SELECT cal.id AS calendario_id, cal.nombre, cal.isGeneral, cal.color, cal.calendario_uuid, df.id AS dia_id, df.fecha, df.comentario
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

export const getCalendariosByEmpleado = (req: Request, res: Response) => {
  const { empleado_id } = req.params;

  const query = `SELECT cal.id AS calendario_id, cal.nombre AS calendario, cal.isGeneral, cal.color, cal.calendario_uuid
                    FROM calendarios cal
                    INNER JOIN calendarios_empleado ce
                    ON cal.id = ce.calendario_id
                    INNER JOIN empleados e
                    ON e.id = ce.empleado_id
                    WHERE e.id = ${empleado_id}`;

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

export const postDiaFestivo = (req: Request, res: Response) => {
  const { body } = req;

  const query = `INSERT INTO  dias_festivos (fecha, comentario, calendario_id)
                  VALUES (?, ?, ?)`;

  const campos = [body.fecha, body.comentario, body.calendario_id];

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

export const putDiaFestivo = (req: Request, res: Response) => {
  const { body } = req;

  const query = `UPDATE dias_festivos SET fecha = ?, comentario = ? WHERE id = ?`;

  const campos = [body.fecha, body.comentario, body.id];

  MySql.ejecutarQuery(query, campos, (err: any, result: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: result,
    });
  });
};

export const deleteDiaFestivo = (req: Request, res: Response) => {
  const { dia_festivo_id } = req.params;

  const query = `DELETE FROM dias_festivos WHERE id = ${dia_festivo_id}`;

  MySql.ejecutarQuery(query, [], (err: any, result: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: result,
    });
  });
};

export const assignCalendarToEmpleados = (req: Request, res: Response) => {
  const { body } = req;

  MySql.instance.pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    }

    const query = `INSERT INTO  calendarios_empleado (empleado_id, calendario_id)
    VALUES (?, ?)`;

    conn.beginTransaction((err) => {
      body.empleados_ids.forEach((empleado: any) => {
        const campos = [empleado, body.calendario_id];
        conn.query(query, campos, (error, results, fields) => {
          if (error) {
            conn.rollback();
          } else {
            conn.commit((err) => {
              if (err) {
                conn.rollback();
              }
            });
          }
        });
      });

      return res.status(200).json({
        ok: "true",
      });
    });
  });
};

export const removeAssignCalendarToEmpleado = (req: Request, res: Response) => {
  const { body } = req;

  const query = `DELETE FROM calendarios_empleados WHERE empleado_id = ? AND calendario_id = ?`;

  const campos = [body.empleado_id, body.calendario_id];

  MySql.ejecutarQuery(query, campos, (err: any, fechas: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    return res.status(200).json({
      payload: fechas,
    });
  });
};

export const getEventosByContenedor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;

  const query = `SELECT id, contenedor_id, description, text, startDate, endDate, recurrenceRule, recurrenceException, allDay, created_at, updated_at, deleted_at
                  FROM eventos
                  WHERE contenedor_id = ${contenedor_id};`;

  MySql.ejecutarQuery(query, [], (err: any, eventos: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      ok: true,
      payload: eventos,
    });
  });
};

export const createEventoByContenedor = (req: Request, res: Response) => {
  const { body } = req;

  const query = `INSERT INTO eventos
                (contenedor_id, description, text, startDate, endDate, recurrenceRule, recurrenceException, allDay)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?);`;

  const campos = [body.contenedor_id, body.description, body.text, body.startDate, body.endDate, body.recurrenceRule, body.recurrenceException, body.allDay];

  MySql.ejecutarQuery(query, campos, (err: any, eventos: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      ok: true,
      payload: eventos,
    });
  });
};

export const deleteEventoByContenedor = (req: Request, res: Response) => {
  const { evento_id } = req.params;

  const query = `DELETE FROM eventos WHERE id = ${evento_id}`;

  MySql.ejecutarQuery(query, [], (err: any, eventos: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      ok: true,
      payload: eventos,
    });
  });
};
