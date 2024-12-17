import { Request, Response } from "express";
import MySql from "../db/mysql";

export const getContactosByCliente = (req: Request, res: Response) => {
  const { idDireccion } = req.params;

  const query = `SELECT * FROM contactos WHERE cliente_id = ${idDireccion}`;

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

export const postContacto = (req: Request, res: Response) => {
  const { body } = req;

  const query = "INSERT INTO contactos (nombre, puesto, email, telefono, web, skype, twiter, facebook, instagram, cliente_id) " + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const campos = [body.nombre, body.puesto, body.email, body.telefono, body.web, body.skype, body.twiter, body.facebook, body.instagram, body.cliente_id];

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

export const putContacto = (req: Request, res: Response) => {
  const { idContacto } = req.params;
  const { body } = req;

  getContactoByID(Number(idContacto))
    .then((oldContacto: any) => {
      const nombre = body.nombre || oldContacto[0].nombre;
      const puesto = body.puesto || oldContacto[0].puesto;
      const email = body.email || oldContacto[0].email;
      const telefono = body.telefono || oldContacto[0].telefono;
      const web = body.web || oldContacto[0].web;
      const skype = body.skype || oldContacto[0].skype;
      const twiter = body.twiter || oldContacto[0].twiter;
      const facebook = body.facebook || oldContacto[0].facebook;
      const instagram = body.instagram || oldContacto[0].instagram;

      const query = `UPDATE contactos SET nombre = ?, puesto =  ?, email =  ?, telefono =  ?, web =  ?, skype =  ?
                            twiter =  ?, facebook =  ?, instagram =  ? WHERE _id = ${idContacto}`;
      const campos = [nombre, puesto, email, telefono, web, skype, twiter, facebook, instagram];
      MySql.ejecutarQuery(query, campos, (err: any, result: any) => {
        if (err) {
          return res.status(400).json({
            msg: "Error en la actualización: " + err,
            ok: true,
            idContacto,
            body,
          });
        }

        return res.status(200).json({
          msj: "Se ha actualizado el contacto",
          result,
        });
      });
    })
    .catch((err: any) => {
      res.status(400).json({
        msg: "Error en la actualización: " + err,
        ok: true,
        idContacto,
        body,
      });
    });
};

export const deleteContacto = (req: Request, res: Response) => {
  const { idContacto } = req.params;

  const query = `DELETE FROM contactos WHERE _id = ${idContacto}`;

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

const getContactoByID = async (id: number) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM contactos WHERE _id = ${id}`;
    MySql.ejecutarQuery(query, [], (err: any, contacto: any) => {
      if (err) {
        reject(err);
      }
      resolve(contacto);
    });
  });
};
