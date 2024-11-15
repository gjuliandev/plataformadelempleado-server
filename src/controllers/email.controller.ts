import { Request, Response } from "express";
const nodemailer = require("nodemailer");

export const sendEmail = async (req: Request, res: Response) => {
  const { body } = req;
  const { destinatario, subject, emailBody } = req.body;

  if (destinatario) {
    let transporter = nodemailer.createTransport({
      host: "plataformadelempleado-es.correoseguro.dinaserver.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "no-responder@plataformadelempleado.es", // generated ethereal user
        pass: "sAcv9F561]$%", // generated ethereal password
      },
    });

    // send mail with defined transport object
    await transporter
      .sendMail({
        from: '"Plataforma del empleado" <no-responder@plataformadelempleado.es>', // sender address
        to: `${destinatario}`, //destinatarios.join(', '),  // list of receivers
        subject: `${subject}`, // Subject line

        html:
          `${emailBody} `+
          `<div>---- &nbsp; </div>` +
          `<div><strong>Plataforma del Empleado</strong>  &nbsp</div>` 
      })
      .then((resp: any) => {
        res.status(200).json({
          ok: true,
          payload: resp,
        });
      })
      .catch((err: any) => {
        res.status(400).json({
          ok: false,
          error: err,
        });
      });
  } else {
    res.status(400).json({
      ok: false,
      msg: "Email NULL",
    });
  }
};
