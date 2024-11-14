import { Request, Response } from "express";
import MySql from "../db/mysql";

export const getContendor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;

  const query = `SELECT * FROM contenedores WHERE id = ${contenedor_id} LIMIT 1`;

  MySql.ejecutarQuery(query, [], (err: any, contenedor: any) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }

    res.status(200).json({
      payload: contenedor,
    });
  });
};
