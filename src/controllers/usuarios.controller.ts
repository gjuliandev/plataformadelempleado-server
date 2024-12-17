import { Request, Response } from "express";
import MySql from "../db/mysql";
import md5 from "md5";
import path from "path";
import fs from "fs";

export const getUsuarios = (req: Request, res: Response) => {
  const query = "SELECT * FROM usuarios";

  MySql.ejecutarQuery(query, [], (err: any, usuarios: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: usuarios,
    });
  });
};

export const getUsuario = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `SELECT * FROM usuarios WHERE _id = ${id} LIMIT 1`;

  MySql.ejecutarQuery(query, [], (err: any, usuario: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: usuario,
    });
  });
};

export const postUsuario = (req: Request, res: Response) => {
  const { body } = req;

  // encriptar la password para que coincida
  body.password = md5(body.password);

  const query = "INSERT INTO usuarios (nombre, email, password, contenedor_id, role, telefono) VALUES (?, ?, ?, ?, ?, ?)";
  const campos = [body.nombre, body.email, body.password, body.contenedor_id, body.role, body.telefono];
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

export const putUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  getUsuarioById(Number(id))
    .then((oldUser: any) => {
      const nombre = body.nombre || oldUser[0].nombre;
      const role = body.role || oldUser[0].role;
      const telefono = body.telefono || oldUser[0].telefono;

      const query = `UPDATE usuarios SET nombre =  '${nombre}', role =  '${role}', telefono =  '${telefono}' WHERE _id = ${id}`;

      MySql.ejecutarQuery(query, [], (err: any, result: any) => {
        if (err) {
          return res.status(400).json({
            msg: "Error en la actualización: " + err,
            ok: true,
            id,
            body,
          });
        }

        return res.status(200).json({
          msj: "Se ha actualizado el usuario",
        });
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: "Error en la actualización: " + err,
        ok: true,
        id,
        body,
      });
    });
};

export const deleteUsuario = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `DELETE FROM usuarios WHERE _id = ${id}`;

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
      const query = `UPDATE usuarios SET img = '${img}' WHERE _id = ${id}`;

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

const eliminarAvatar = (id: number) => {
  return new Promise((resolve, reject) => {
    getUsuarioById(id)
      .then((usuario: any) => {
        const pathAntiguo = path.resolve(__dirname, "../assets/uploads/avatar/", usuario[0].img);
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

const getUsuarioById = async (id: number) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM usuarios WHERE _id = ${id}`;
    MySql.ejecutarQuery(query, [], (err: any, usuario: any) => {
      if (err) {
        reject(err);
      }
      resolve(usuario);
    });
  });
};
