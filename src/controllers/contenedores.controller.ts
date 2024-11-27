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

export const getUnidadesByContadorContenedor = (req: Request, res: Response) => {
  const { contenedor_id, tipo_id } = req.params;

  const query = `SELECT cc.id, cc.contador_id, cc.contenedor_id, cc.unidades, cc.mes_caducidad, cc.dia_caducidad 
                  FROM contadores_contenedores cc
                  INNER JOIN contenedores c
                  ON c.id = cc.contenedor_id
                  INNER JOIN aux_tipo_solicitud ats
                  ON ats.id = cc.contador_id
                  WHERE cc.contador_id = ${tipo_id} AND cc.contenedor_id = ${contenedor_id}`;

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
