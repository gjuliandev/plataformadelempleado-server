import { Request, Response } from "express";
import MySql from "../db/mysql";

export const getSolicitudesByContenedor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;
  const query = `SELECT c.id as contenedor_id, e.usuario, s.*
                FROM contenedores c
                INNER JOIN empleados e
                ON c.id = e.contenedor_id
                INNER JOIN solicitudes s
                ON s.empleado_id = e.id
                WHERE contenedor_id = ${contenedor_id}
                ORDER BY s.fecha_inicio DESC`;

  MySql.ejecutarQuery(query, [], (err: any, fichajes: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: fichajes,
    });
  });
};

export const getSolicitudesByEmpleado = (req: Request, res: Response) => {
  const { empleado_id } = req.params;

  const query = `SELECT c.id as contenedor_id, e.usuario, s.*
                FROM contenedores c
                INNER JOIN empleados e
                ON c.id = e.contenedor_id
                INNER JOIN solicitudes s
                ON s.empleado_id = e.id
                WHERE e.id = ${empleado_id}
                ORDER BY s.fecha_inicio DESC`;

  MySql.ejecutarQuery(query, [], (err: any, fichajes: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: fichajes,
    });
  });
};

export const getSolicitud = (req: Request, res: Response) => {
  const { solicitud_id } = req.params;

  const query = `SELECT * FROM solicitudes WHERE id = ${solicitud_id} LIMIT 1`;

  MySql.ejecutarQuery(query, [], (err: any, fichaje: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: fichaje,
    });
  });
};

export const postSolicitud = (req: Request, res: Response) => {
  const { body } = req;

  const query = "INSERT INTO solicitudes (tipo_id, empleado_id, comentarios, allDay, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, ?)";
  const campos = [body.tipo_id, body.empleado_id, body.comentarios, body.allDay, body.fecha_inicio, body.fecha_fin];

  // tipo_id = 1 Vacaciones, 2 Asuntos propios;

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

export const deleteSolicitud = (req: Request, res: Response) => {
  const { solicitud_id } = req.params;

  const query = `DELETE FROM solicitudes WHERE id = ${solicitud_id}`;

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
