import { Request, Response } from "express";
import MySql from "../db/mysql";

export const getSolicitudesByContenedor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;
  const query = `SELECT c.id as contenedor_id, e.nombre, e.apellido1, e.apellido2, s.*,
                  CASE 
                    WHEN allDay = 0 THEN time_format(TIMEDIFF(fecha_fin, fecha_inicio),'%H:%i')
                    WHEN allDay = 1 THEN DATEDIFF(fecha_fin, fecha_inicio)
                  END AS duracion
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

  const query = `SELECT c.id as contenedor_id, e.usuario, s.*, ats.*,
                  CASE 
                    WHEN allDay = 0 THEN TIMEDIFF(fecha_fin, fecha_inicio)
                    WHEN allDay = 1 THEN DATEDIFF(fecha_fin, fecha_inicio)
                  END AS duracion
                FROM contenedores c
                INNER JOIN empleados e
                ON c.id = e.contenedor_id
                INNER JOIN solicitudes s
                ON s.empleado_id = e.id
                INNER JOIN aux_tipo_solicitud ats
                ON s.tipo_id = ats.id
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

  const query = `SELECT *,
                  CASE 
                    WHEN allDay = 0 THEN TIMEDIFF(fecha_fin, fecha_inicio)
                    WHEN allDay = 1 THEN DATEDIFF(fecha_fin, fecha_inicio)
                  END AS duracion 
                FROM solicitudes 
                WHERE id = ${solicitud_id} LIMIT 1`;

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

  const query = `INSERT INTO solicitudes (tipo_id, empleado_id, estado_id, comentarios, allDay, fecha_inicio, fecha_fin) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const campos = [body.tipo_id, body.empleado_id, body.estado_id, body.comentarios, body.allDay, body.fecha_inicio, body.fecha_fin];

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

export const validarSolicitud = (req: Request, res: Response) => {
  const { solicitud_id } = req.params;

  const query = `UPDATE solicitudes SET estado_id = 2
                 WHERE id = ${solicitud_id}`;

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

export const rechazarSolicitud = (req: Request, res: Response) => {
  const { solicitud_id } = req.params;

  const query = `UPDATE solicitudes SET estado_id = 3
                 WHERE id = ${solicitud_id}`;

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

export const updateResolucion = (req: Request, res: Response) => {
  const { solicitud_id } = req.params;
  const { resolucion } = req.body;

  const query = `UPDATE solicitudes SET resolucion = '${resolucion}'
                 WHERE id = ${solicitud_id}`;

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

export const getTiposSolicitud = (req: Request, res: Response) => {
  const query = `SELECT id, nombre, unidad_medida FROM aux_tipo_solicitud`;

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

export const getTiposSolicitudByContenedor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;

  const query = `SELECT ats.id, ats.nombre, ats.unidad_medida 
                FROM aux_tipo_solicitud ats
                INNER JOIN contadores_contenedores cc
                ON ats.id = cc.contador_id
                INNER JOIN contenedores c
                ON cc.contenedor_id = c.id
                WHERE c.id = ${contenedor_id}`;

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

export const getStatusSolicitud = (req: Request, res: Response) => {
  const query = `SELECT id, estado FROM aux_status_solicitud`;

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
