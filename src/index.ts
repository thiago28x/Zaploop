import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import routes from './routes';
import { init } from './wa';
import loggerMiddleware from './middlewares/logger';
import { Socket } from 'socket.io';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use(loggerMiddleware);




const http = require('http');
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
//const io = require("socket.io")(httpServer, options);
import { Server } from "socket.io";
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, options);



const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 3000);
const listener = () => console.log(`\n \n Server ready 🤩 \n \n http://${host}:${port} \n `);


//typescript defining types for socket.io
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  msg: (message: string) => void; // Add this line
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


(async () => {
  await init();
  httpServer.listen(port, host, listener);
})();


io.on('connection', (client: Socket) => {
  clients.push(client);
  console.log('a user connected 😍 \n');
  client.on('disconnect', () => {
    clients.splice(clients.indexOf(client), 1)
    console.log('user disconnected 😪 \n');
  });
});

 app.get('/msg', (req, res) => {
  const msg = req.query.msg || '';
  for(const client of clients) {
    client.emit('msg', msg)
  }
  res.json({
    ok:true
  })
})

//const clients : Array<any>= [];

const clients: Socket[] = [];

const emitMessage = (message: string) => {
  for (const client of clients) {
    client.emit('msg', message);
  }
};




io.on("connection", (socket) => {
  socket.emit("noArg");

  // works when broadcast to all
  io.emit("noArg");

});

//export { emitMessage };
export { io };







