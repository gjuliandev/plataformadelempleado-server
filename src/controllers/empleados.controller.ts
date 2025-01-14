import { Request, Response } from "express";
import MySql from "../db/mysql";
import path from "path";
import fs from "fs";

import moment from "moment";
import md5 from "md5";

export const getEmpleadosByContenedor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;

  const query = `SELECT  e.* FROM empleados e
                    INNER JOIN contenedores c
                    ON c.id = e.contenedor_id
                    WHERE c.id = ${contenedor_id}`;

  MySql.ejecutarQuery(query, [], (err: any, empleados: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleados,
    });
  });
};

export const getEmpleados = (req: Request, res: Response) => {
  const query = "SELECT * FROM empleados";

  MySql.ejecutarQuery(query, [], (err: any, empleados: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleados,
    });
  });
};

export const getContadoresByEmpleado = (req: Request, res: Response) => {
  const { empleado_id } = req.params;
  const query = `SELECT 
                  e.id AS empleado_id, 
                  e.codigo, 
                  CONCAT(e.nombre, ' ', e.apellido1)  AS nombre_empleado, 
                  c.nombreComercial AS contenedor, 
                  ats.nombre AS nombre_tipo_solicitud, 
                  ats.alias,
                  ats.unidades,
                  aum.name AS unidad, 
                  atd.tipo_dia, 
                  ats.fecha_caducidad,
                  ats.esBolsa
                FROM empleados e
                INNER JOIN contenedores c
                ON c.id = e.contenedor_id
                INNER JOIN aux_tipo_solicitud ats
                ON c.id = ats.contenedor_id
                INNER JOIN aux_unidades_medida aum
                ON ats.unidad_medida = aum.id
                LEFT JOIN aux_tipo_dia atd
                ON aum.tipo_dia_id = atd.id
                WHERE e.id = ${empleado_id}`;

  MySql.ejecutarQuery(query, [], (err: any, empleado: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleado,
    });
  });
};

export const getAusenciasByEmpleado = (req: Request, res: Response) => {

  const { empleado_id } = req.params;
  
  const query = `SELECT ats.nombre as nombre_solicitud, s.allDay, s.fecha_inicio, s.fecha_fin, e.empleado_uuid
                FROM solicitudes s
                INNER JOIN aux_tipo_solicitud ats
                ON s.tipo_id = ats.id
                INNER JOIN aux_status_solicitud ass
                ON s.estado_id = ass.id
                INNER JOIN empleados e
                ON s.empleado_id = e.id
                WHERE s.empleado_id = ${empleado_id}`;

  MySql.ejecutarQuery(query, [], (err: any, empleado: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleado,
    });
  });
};

// Unidades de ese tipo de solicitud que tiene el empleado en la bolsa por las razones que sean, se pueden poner de forma manual desde el frontal
export const getContadoresByBolsaEmpleado = (req: Request, res: Response) => {
  const { empleado_id } = req.params;
  const query = `SELECT 
                  e.id AS empleado_id, 
                  e.codigo, 
                  CONCAT(e.nombre, ' ', e.apellido1)  AS nombre_empleado, 
                  ats.nombre AS nombre_tipo_solicitud, 
                  ats.alias,
                  bce.unidades,
                  aum.name AS unidad, 
                  atd.tipo_dia, 
                  bce.fecha_caducidad
                FROM empleados e
                INNER JOIN bolsa_contadores_empledos bce
                ON e.id = bce.empleado_id
                INNER JOIN aux_tipo_solicitud ats
                ON ats.id = bce.tipo_solicitud_id
                INNER JOIN aux_unidades_medida aum
                ON ats.unidad_medida = aum.id
                LEFT JOIN aux_tipo_dia atd
                ON aum.tipo_dia_id = atd.id
                WHERE e.id = ${empleado_id}`;

  MySql.ejecutarQuery(query, [], (err: any, empleado: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleado,
    });
  });
};

export const getContadoresByBolsaEmpleadoAndTipo = (req: Request, res: Response) => {
  const { empleado_id, tipo_id } = req.params;
  const query = `SELECT 
                  e.id AS empleado_id, 
                  e.codigo, 
                  CONCAT(e.nombre, ' ', e.apellido1)  AS nombre_empleado, 
                  ats.nombre AS nombre_tipo_solicitud, 
                  ats.alias,
                  bce.unidades,
                  aum.name AS unidad, 
                  atd.tipo_dia, 
                  bce.fecha_caducidad
                FROM empleados e
                INNER JOIN bolsa_contadores_empledos bce
                ON e.id = bce.empleado_id
                INNER JOIN aux_tipo_solicitud ats
                ON ats.id = bce.tipo_solicitud_id
                INNER JOIN aux_unidades_medida aum
                ON ats.unidad_medida = aum.id
                LEFT JOIN aux_tipo_dia atd
                ON aum.tipo_dia_id = atd.id
                WHERE e.id = ${empleado_id} AND ats.id = ${tipo_id}`;

  MySql.ejecutarQuery(query, [], (err: any, empleado: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleado,
    });
  });
};

export const getUnidadesConsumidas = (req: Request, res: Response) => {
 
  const query = `SELECT empleado_id, tipo_id, e.nombre AS empleado, ats.nombre AS solicitud, CASE 
                  WHEN allDay = 0 THEN SUM(nHoras)
                  WHEN allDay = 1 THEN SUM(nDias)
                  END AS duracion 
                FROM solicitudes s
                INNER JOIN empleados e
                ON e.id = s.empleado_id
                INNER JOIN aux_tipo_solicitud ats
                ON ats.id = s.tipo_id
                GROUP BY empleado_id, tipo_id`;

  MySql.ejecutarQuery(query, [], (err: any, empleado: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleado,
    });
  });
};

export const getUnidadesConsumidasByEmpleado = (req: Request, res: Response) => {
  const { empleado_id, tipo_id } = req.params;
  const query = `SELECT empleado_id, tipo_id, e.nombre AS empleado, ats.nombre AS solicitud, CASE 
                  WHEN allDay = 0 THEN SUM(nHoras)
                  WHEN allDay = 1 THEN SUM(nDias)
                  END AS duracion 
                FROM solicitudes s
                INNER JOIN empleados e
                ON e.id = s.empleado_id
                INNER JOIN aux_tipo_solicitud ats
                ON ats.id = s.tipo_id
                WHERE empleado_id = ${empleado_id}
                GROUP BY empleado_id, tipo_id`;

  MySql.ejecutarQuery(query, [], (err: any, empleado: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleado,
    });
  });
};

export const getEmpleado = (req: Request, res: Response) => {
  const { empleado_id } = req.params;

  const query = `SELECT * FROM empleados WHERE id = ${empleado_id} LIMIT 1`;

  MySql.ejecutarQuery(query, [], (err: any, empleado: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleado,
    });
  });
};


export const getEstadisticasContadoresByContenedores = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;

  const query = `SELECT e.nombre AS empleado, s.tipo_id AS tipo, ats.nombre, ats.unidades, aum.name AS unidad_medida,
                CASE 
                  WHEN allDay = 0 THEN SUM(nHoras) 
                  WHEN allDay = 1 THEN SUM(s.nDias) 
                END AS disfrutadas,
                CASE 
                  WHEN allDay = 0 THEN ats.unidades - SUM(nHoras) 
                  WHEN allDay = 1 THEN ats.unidades - SUM(s.nDias) 
                END AS disponibles
                FROM solicitudes s
                INNER JOIN empleados e
                ON s.empleado_id = e.id
                INNER JOIN aux_tipo_solicitud ats
                ON ats.id = s.tipo_id
                INNER JOIN aux_unidades_medida aum
                ON ats.unidad_medida = aum.id
                  WHERE e.contenedor_id = ${contenedor_id}
                  GROUP BY e.nombre, s.tipo_id, ats.nombre, aum.name `;

  MySql.ejecutarQuery(query, [], (err: any, empleado: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleado,
    });
  });
};

export const getEstadisticasContadoresByEmpleado = (req: Request, res: Response) => {
  const { empleado_id } = req.params;

    const query = `SELECT e.nombre AS empleado, s.tipo_id AS tipo, ats.nombre, ats.unidades, aum.name AS unidad_medida,
                  CASE 
                    WHEN allDay = 0 THEN SUM(nHoras) 
                    WHEN allDay = 1 THEN SUM(s.nDias) 
                  END AS disfrutadas,
                  CASE 
                    WHEN allDay = 0 THEN ats.unidades - SUM(nHoras) 
                    WHEN allDay = 1 THEN ats.unidades - SUM(s.nDias) 
                  END AS disponibles
                  FROM solicitudes s
                  INNER JOIN empleados e
                  ON s.empleado_id = e.id
                  INNER JOIN aux_tipo_solicitud ats
                  ON ats.id = s.tipo_id
                  INNER JOIN aux_unidades_medida aum
                  ON ats.unidad_medida = aum.id
                  WHERE e.id = ${empleado_id}
                  GROUP BY e.nombre, s.tipo_id, ats.nombre, aum.name `;

  MySql.ejecutarQuery(query, [], (err: any, empleado: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: empleado,
    });
  });
};


export const postEmpleado = (req: Request, res: Response) => {
  const { body } = req;

  const codigo = body.codigo || "";
  const apellido1 = body.apellido1 || "";
  const apellido2 = body.apellido2 || "";
  const nombre = body.nombre || "";
  const documento = body.documento || "";
  const telefono = body.telefono || "";
  const email = body.email || "";
  const usuario = body.usuario || "";
  const contrasena = md5(body.contrasena) || "";
  const domicilio = body.domicilio || "";
  const poblacion = body.poblacion || "";
  const provincia = body.provincia || "";
  const codPostal = body.codPostal || "";
  const fecha_nacimiento = moment(body.fecha_nacimiento).format("YYYY-MM-DD") || "";
  const observaciones = body.observaciones || "";
  const fecha_alta = moment(body.fecha_alta).format("YYYY-MM-DD") || "";
  const puesto = body.puesto || "";
  const color = body.color || "";

  const query = `CALL sp_create_empleado (
        IF ('${codigo}' = '' , NULL, '${codigo}'),
        IF ('${documento}' = '' , NULL, '${documento}'),
        IF ('${nombre}' = '' , NULL, '${nombre}'),
        IF ('${apellido1}' = '' , NULL, '${apellido1}'),
        IF ('${apellido2}'  = '', NULL, '${apellido2}'),
        IF ('${fecha_nacimiento}' = '' , NULL, '${fecha_nacimiento}'),
        IF ('${domicilio}' = '' , NULL, '${domicilio}'),
        IF ('${poblacion}' = '' , NULL, '${poblacion}'),
        IF ('${provincia}' = '' , NULL, '${provincia}'),
        IF ('${codPostal}' = '' , NULL, '${codPostal}'),
        IF ('${telefono}' = '' , NULL, '${telefono}'),
        IF ('${email}' = '' , NULL, '${email}'),
        IF ('${usuario}' = '' , NULL, '${usuario}'),
        IF ('${contrasena}' = '' , NULL, '${contrasena}'),
        IF ('${color}' = '' , NULL, '${color}'),
        IF ('${fecha_alta}' = '' , NULL, '${fecha_alta}'),
        IF ('${puesto}' = '' , NULL, '${puesto}'),
        IF ('${observaciones}' = '' , NULL, '${observaciones}')
    )`;

  console.log(query);

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

export const putEmpleado = (req: Request, res: Response) => {
  const { empleado_id } = req.params;
  const { body } = req;

  const codigo = body.codigo || null;
  const apellido1 = body.apellido1 || null;
  const apellido2 = body.apellido2 || null;
  const nombre = body.nombre || null;
  const documento = body.documento || null;
  const telefono = body.telefono || null;
  const email = body.email || null;
  const fecha_nacimiento = moment(body.fecha_nacimiento).format("YYYY-MM-DD") || null;
  const departamento = body.departamento || null;
  const domicilio = body.domicilio || null;
  const poblacion = body.poblacion || null;
  const provincia = body.provincia || null;
  const codPostal = body.codPostal || null;

  const query = `UPDATE empleados SET codigo = ?, apellido1 = ?, apellido2 = ?
  , nombre=?, documento=?, telefono=?, email=?, fecha_nacimiento=?, departamento=?
  , domicilio=?, poblacion=?, provincia=?, codPostal=? WHERE id = ${empleado_id}`;

  const campos = [codigo, apellido1, apellido2, nombre, documento, telefono, email, fecha_nacimiento, departamento, domicilio, poblacion, provincia, codPostal];

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

export const deleteEmpleado = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `DELETE FROM empleados WHERE _id = ${id}`;

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

export const actualizarAvatar = (id: number, img: string) => {
  eliminarAvatar(id)
    .then(() => {
      const query = `UPDATE empleados SET img = '${img}' WHERE _id = ${id}`;

      MySql.ejecutarQuery(query, [], (err: any, result: any) => {
        if (err) {
          return err;
        }
        return result[0];
      });
    })
    .catch((err) => {
      return err;
    });
};

export const cambiarEstado = (req: Request, res: Response) => {
  const { empleado_id, deleted_at } = req.body;

  const query = `UPDATE empleados 
                SET deleted_at = ?
                WHERE id = ${empleado_id}`;

  const campos = [deleted_at];

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

// unidades que ha utilizado de ese tipos de solicitud el empleado
export const getNumUnidadesBySolicitud = (req: Request, res: Response) => {
  const { empleado_id, tipo_solicitud } = req.params;

  const query = `SELECT s.empleado_id,
                  SUM(CASE
                      WHEN allDay = 0 THEN nHoras
                      WHEN allDay = 1 THEN nDias
                    END) duracion
                  FROM solicitudes s
                  INNER JOIN aux_status_solicitud ass
                  ON s.estado_id = ass.id
                  WHERE ass.internal_type = 'STATUS_VALIDATED'
                    AND empleado_id = ${empleado_id}
                    AND tipo_id = ${tipo_solicitud}
                  GROUP BY s.empleado_id`;

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

const eliminarAvatar = (id: number) => {
  return new Promise((resolve, reject) => {
    getEmpleadoById(id)
      .then((empleado: any) => {
        const pathAntiguo = path.resolve(__dirname, "../assets/uploads/avatar/", empleado[0].img);
        if (fs.existsSync(pathAntiguo)) {
          fs.unlink(pathAntiguo, (error) => {
            reject(error);
          });
        }
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getEmpleadoById = async (id: number) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM empleados WHERE _id = ${id}`;
    MySql.ejecutarQuery(query, [], (err: any, empleado: any) => {
      if (err) {
        reject(err);
      }
      resolve(empleado);
    });
  });
};
