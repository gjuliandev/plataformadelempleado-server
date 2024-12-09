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

export const getContadoresByContenedor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;

  const query = `SELECT c.nombreComercial AS contenedor, ats.nombre AS nombre_solicitud, ats.alias,  aum.name AS unidad, atd.tipo_dia, ats.fecha_caducidad
                  FROM aux_tipo_solicitud ats
                  INNER JOIN aux_unidades_medida aum
                  ON ats.unidad_medida = aum.id
                  LEFT JOIN aux_tipo_dia atd
                  ON aum.tipo_dia_id = atd.id
                  INNER JOIN contenedores c
                  ON c.id = ats.contenedor_id
                  WHERE c.id = ${contenedor_id}`;

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

export const putContenedor = (req: Request, res: Response) => {
  const { contenedor_id } = req.params;
  const { body } = req;

  const query = `UPDATE contenedores 
                  SET nombreFiscal =  '${body.nombreFiscal}', 
                      nombreComercial =  '${body.nombreComercial}', 
                      cif =  '${body.cif}', 
                      telefono = '${body.telefono}',
                      telefonoSOS = '${body.telefonoSOS}',
                      email= '${body.email}'
                      WHERE id = ${contenedor_id}`;

  MySql.ejecutarQuery(query, [], (err: any, result: any) => {
    if (err) {
      return res.status(400).json({
        msg: "Error en la actualización: " + err,
        ok: true,
        contenedor_id,
        body,
      });
    }

    return res.status(200).json({
      msj: "Se ha actualizado el fichaje",
    });
  });
};
