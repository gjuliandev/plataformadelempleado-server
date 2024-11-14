import { Request, Response } from "express";
import MySql from "../db/mysql";
import md5 from "md5";

export const login = async (req: Request, res: Response) => {
  const { body } = req;

  const query = `SELECT e.id as empleado_id, e.nombre, e.usuario, e.email, e.avatar, e.contrasena, c.id as contenedor_id, c.nombreFiscal as contenedor
                 FROM empleados e
                 INNER JOIN contenedores c
                 ON e.contenedor_id = c.id
                 WHERE ( e.usuario = '${body.usuario}' ) 
                 LIMIT 1`;

  MySql.ejecutarQuery(query, [], (err: any, usuarioDB: any) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: err,
      });
    }

    if (!usuarioDB[0]) {
      return res.status(400).json({
        ok: false,
        msg: "Error en usuario y/o contraseña",
      });
    } else {
      // Checkeamos las password encriptada

      if (md5(body.contrasena) !== usuarioDB[0].contrasena) {
        return res.status(400).json({
          msg: "Error en contraseña y/o usuario",
        });
      }

      res.status(200).json({
        ok: true,
        payload: usuarioDB[0],
      });
    }
  });
};

export const resetPasword = (req: Request, res: Response) => {
  const { empleado_id } = req.params;
  const { body } = req;

  // encriptar la password para que coincida
  const password = md5(body.newpassword);

  const query = `UPDATE empleados 
                 SET contrasena = '${password}' 
                 WHERE id = ${empleado_id}`;

  MySql.ejecutarQuery(query, [], (err: any, result: any) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        msg: err,
      });
    }

    res.status(200).json({
      ok: true,
      msg: result,
    });
  });
};
