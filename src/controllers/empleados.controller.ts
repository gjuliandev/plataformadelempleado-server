import { Request, Response } from "express";
import MySql from "../db/mysql";
import path from "path";
import fs from "fs";

import moment from "moment";
import md5 from "md5";

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

export const getEmpleadosByContenedor = (req: Request, res: Response) => {
  const query = `SELECT  e.* FROM empleados e
                    INNER JOIN contenedores c
                    ON c.id = e.contenedor_id`;

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

export const getEmpleado = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `SELECT * FROM empleados WHERE id = ${id} LIMIT 1`;

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

  const query = `CALL sp_update_empleado (
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
        IF ('${observaciones}' = '' , NULL, '${observaciones}'),
        ${empleado_id}
    )`;

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
  const {empleado_id, estado} = req.body;
  
  const query = `UPDATE empleados SET estado = ${estado} WHERE id = ${empleado_id}`;

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
