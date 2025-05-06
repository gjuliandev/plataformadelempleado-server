import Server from './server/server';

//produccion
const server = new Server(13007);

//preproducion
//const server = new Server(13014);

server.startHttp();
//server.startHttps();