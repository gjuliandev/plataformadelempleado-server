import express from "express";
import http from "http";
import https from "https";

import fs from "fs";

import userRouter from "../routes/usuario";
import authRouter from "../routes/auth";
import fileRouter from "../routes/file";
import clienteRouter from "../routes/cliente";
import direccioneRouter from "../routes/direccion";
import dashboardRouter from "../routes/dashboard";
import contactoRouter from "../routes/contacto";
import empleadoRouter from "../routes/empleado.routes";
import fichajeRouter from "../routes/fichaje.route";
import accesoRouter from "../routes/acceso.routes";
import solicitudRouter from "../routes/solicitud.route";
import contenedorRouter from "../routes/contenedor.routes";

import cors from "cors";

class Server {
  private credentials = {
    key: fs.existsSync("/home/plataformadelempleado/.certbot/config/live/api.plataformadelempleado.es/privkey.pem")
      ? fs.readFileSync("/home/plataformadelempleado/.certbot/config/live/api.plataformadelempleado.es/privkey.pem")
      : "",
    cert: fs.existsSync("/home/plataformadelempleado/.certbot/config/live/api.plataformadelempleado.es/fullchain.pem")
      ? fs.readFileSync("/home/plataformadelempleado/.certbot/config/live/api.plataformadelempleado.es/fullchain.pem")
      : "",
    ca: fs.existsSync("/home/plataformadelempleado/.certbot/config/live/api.plataformadelempleado.es/chain.pem")
      ? fs.readFileSync("/home/plataformadelempleado/.certbot/config/live/api.plataformadelempleado.es/chain.pem")
      : "",
  };

  public app: express.Application;
  private port: number;

  private httpServer: http.Server;
  private httpsServer: https.Server;

  private apiPaths = {
    file: "/api/file",
    auth: "/api/auth",
    usuarios: "/api/usuarios",
    clientes: "/api/clientes",
    direcciones: "/api/direcciones",
    dashboard: "/api/dashboard",
    contactos: "/api/contactos",
    empleados: "/api/empleados",
    fichajes: "/api/fichajes",
    accesos: "/api/accesos",
    solicitudes: "/api/solicitudes",
    contenedores: "/api/contenedores",
  };

  constructor(puerto: number) {
    this.app = express();
    this.port = puerto;

    this.httpServer = new http.Server(this.app);
    this.httpsServer = new https.Server(this.credentials, this.app);

    // Middleware
    this.middlewares();

    //Definicion de rutas
    this.routes();
  }

  static init(puerto: number) {
    return new Server(puerto);
  }

  // Definición de rutas de la aplicacion
  routes() {
    this.app.use(this.apiPaths.auth, authRouter);
    this.app.use(this.apiPaths.usuarios, userRouter);
    this.app.use(this.apiPaths.file, fileRouter);
    this.app.use(this.apiPaths.clientes, clienteRouter);
    this.app.use(this.apiPaths.direcciones, direccioneRouter);
    this.app.use(this.apiPaths.dashboard, dashboardRouter);
    this.app.use(this.apiPaths.contactos, contactoRouter);
    this.app.use(this.apiPaths.empleados, empleadoRouter);
    this.app.use(this.apiPaths.fichajes, fichajeRouter);
    this.app.use(this.apiPaths.accesos, accesoRouter);
    this.app.use(this.apiPaths.solicitudes, solicitudRouter);
    this.app.use(this.apiPaths.contenedores, contenedorRouter);
  }

  // Definición de los Middlewares que utiliza la aplicación
  middlewares() {
    // CORS
    this.app.use(cors());

    // lectura del body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  // Punto de entrada de la aplicación
  startHttp() {
    this.httpServer.listen(this.port, () => {
      console.log("Servidor express corriendo en local en el puerto: ", this.port);
    });
  }

  startHttps() {
    this.httpsServer.listen(this.port, () => {
      console.log("Servidor express corriendo en producción conexion segura ", this.port);
    });
  }
}

export default Server;
