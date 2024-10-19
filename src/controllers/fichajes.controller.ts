import { Request, Response } from "express";
import MySql from "../db/mysql";
import md5 from "md5";
import path from "path";
import fs from "fs";

export const getFichajes = (req: Request, res: Response) => {
  const query = "SELECT * FROM fichajes";

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

export const getFichajesByEmpleado = (req: Request, res: Response) => {
  const { empleado_id } = req.params;

  const query = `SELECT * FROM fichajes 
                    WHERE empleado_id = ${empleado_id}
                    ORDER BY fecha_hora_in DESC`;

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

export const getFichajesByContenedor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;
  const query = `SELECT f.id as fichaje_id, f.empleado_id, f.source_in, f.persona_fichaje_in, f.fecha_hora_in, f.mensaje_in,
                f.fecha_hora_out, f.mensaje_out, f.source_out, f.duracion, e.nombre, e.apellido1, e.apellido2        
                FROM fichajes f
                INNER JOIN empleados e
                ON f.empleado_id = e.id
                WHERE e.contenedor_id = ${contenedor_id}
                ORDER BY f.fecha_hora_in DESC`;

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

export const getFichaje = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `SELECT * FROM fichajes WHERE id = ${id} LIMIT 1`;

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

export const getTiempoTrabajo = (req: Request, res: Response) => {
  // se mide por fecha 1 dia y devuelve minutos
  const { empleado_id, fecha } = req.params;

  console.log(fecha);
  const query = `SELECT SUM(duracion) AS duracion FROM fichajes 
                WHERE empleado_id = ${empleado_id} 
                AND DATE(fecha_hora_in) = '${fecha}' `;

  console.log(query);

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

export const postFichaje = (req: Request, res: Response) => {
  const { body } = req;

  const query = "INSERT INTO accesos (source_id, empleado_id, tipo_acceso, fecha, comentarios) VALUES (?, ?, ?, ?, ?)";
  const campos = [body.source_id, body.empleado_id, body.tipo_acceso, body.fecha, body.comentarios];

  // tipo_acceso = 1 Entrada, 2 Salida;
  // source_id = 1 movil 2 tablet 3 web 4 auto

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

export const putFichaje = (req: Request, res: Response) => {
  const { fichaje_id } = req.params;
  const { body } = req;

  const query = `UPDATE fichajes 
                SET source_in =  ${body.source_in}, 
                    fecha_hora_in =  '${body.fecha_hora_in}', 
                    fecha_hora_out =  '${body.fecha_hora_out}', 
                    source_out = ${body.source_out}
                    WHERE id = ${fichaje_id}`;

  MySql.ejecutarQuery(query, [], (err: any, result: any) => {
    if (err) {
      return res.status(400).json({
        msg: "Error en la actualización: " + err,
        ok: true,
        fichaje_id,
        body,
      });
    }

    return res.status(200).json({
      msj: "Se ha actualizado el fichaje",
    });
  });
};

export const deleteFichaje = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `DELETE FROM fichajes WHERE id = ${id}`;

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

const getFichajeById = async (id: number) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM fichajes WHERE id = ${id}`;
    MySql.ejecutarQuery(query, [], (err: any, fichaje: any) => {
      if (err) {
        reject(err);
      }
      resolve(fichaje);
    });
  });
};
