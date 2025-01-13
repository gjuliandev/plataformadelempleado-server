import { Request, Response } from "express";
import MySql from "../db/mysql";

export const getAuxUnidadesMedida = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;

  const query = `SELECT id, name 
                FROM aux_unidades_medida`;

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
