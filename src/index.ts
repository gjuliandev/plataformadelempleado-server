import Server from './server/server';


const server = new Server(13007);

//server.startHttp();
server.startHttps();