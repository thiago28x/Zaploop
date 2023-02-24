import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import routes from './routes';
import { init } from './wa';
import loggerMiddleware from './middlewares/logger';
import { createServer } from 'https';
import  readFileSync  from 'fs';
import fs from 'fs';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';



const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/', routes);
app.use(loggerMiddleware);

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/api2.zaploop.xyz/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api2.zaploop.xyz/fullchain.pem')
};

/*     TO-DO change path to .env
const options = {
  key: readFileSync(process.env.SSL_KEY_PATH),
  cert: readFileSync(process.env.SSL_CERT_PATH),
}; */

const server = createServer(options, app);

const io = new Server(server);


init();


const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 3000);

server.listen(port, host, () => {
  console.log(`\n \n Server ready 🤩 \n \n https://${host}:${port}/pages/start \n `);
});








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




io.on('connection', (client: Socket) => {
  clients.push(client);
  console.log('a user connected 😍 \n' + client.id);
  client.on('disconnect', () => {
    console.log('user disconnected 😪 \n' + client.id);
    clients.splice(clients.indexOf(client), 1)

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




export { io };







