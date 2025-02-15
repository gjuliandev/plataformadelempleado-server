import { Request, Response } from "express";
import MySql from "../db/mysql";

export const getSolicitudesByContenedor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;
  const query = `SELECT c.id as contenedor_id, e.id as empleado_id, e.nombre, e.apellido1, e.apellido2, 
                s.fecha_inicio, s.fecha_fin, s.nHoras,s.nDias, s.id as solicitud_id, s.allDay, s.comentarios, s.estado_id, s.fromBolsa, s.resolucion, s.gestionada_por,
                  CASE 
                    WHEN s.allDay = 0 THEN time_format(TIMEDIFF(s.fecha_fin, s.fecha_inicio),'%H:%i')
                    WHEN s.allDay = 1 THEN DATEDIFF(fecha_fin, fecha_inicio)
                  END AS duracion,
                  ats.nombre as nombre_solicitud, ats.id as tipo_solicitud_id
                FROM contenedores c
                INNER JOIN empleados e
                ON c.id = e.contenedor_id
                INNER JOIN solicitudes s
                ON s.empleado_id = e.id
                INNER JOIN aux_tipo_solicitud ats
                ON s.tipo_id = ats.id
                LEFT JOIN empleados e2
                ON s.gestionada_por = e2.id
                WHERE c.id = ${contenedor_id}
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
                    WHEN allDay = 0 THEN nHoras
                    WHEN allDay = 1 THEN nDias
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

  const query = `INSERT INTO solicitudes (tipo_id, empleado_id, estado_id, comentarios, allDay, nDias, nHoras, fromBolsa, fecha_inicio, fecha_fin) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const campos = [body.tipo_id, body.empleado_id, body.estado_id, body.comentarios, body.allDay, body.nDias, body.nHoras, body.usarBolsa, body.fecha_inicio, body.fecha_fin];

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
  const { body } = req;

  const query = `CALL sp_validar_solicitud(?, ?, ?, ?, ?, ?, ?)`;
  const campos = [body.solicitud_id, body.fromBolsa, body.allDay, body.unidades, body.empleado_id, body.tipo_solicitud_id, body.gestionada_por];

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

  const query = `SELECT ats.id, ats.nombre, aum.name AS unidad_medida, ats.unidades, ats.fecha_caducidad
                  FROM aux_tipo_solicitud ats
                  INNER JOIN aux_unidades_medida aum
                  ON ats.unidad_medida = aum.id
                  INNER JOIN contenedores c
                  ON ats.contenedor_id = c.id
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

export const getTiposSolicitudByBolsaEmpleado = (req: Request, res: Response) => {
  const { empleado_id } = req.params;

  const query = `SELECT ats.id, ats.nombre, aum.name AS unidad_medida, bce.unidades, bce.fecha_caducidad
                  FROM aux_tipo_solicitud ats
                  INNER JOIN aux_unidades_medida aum
                  ON ats.unidad_medida = aum.id
                  INNER JOIN bolsa_contadores_empleados bce
                  ON ats.id = bce.tipo_solicitud_id
                  INNER JOIN empleados e
                  ON e.id = bce.empleado_id
                  WHERE e.id = ${empleado_id}`;

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
