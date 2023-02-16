import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import routes from './routes';
import { init } from './wa';
import loggerMiddleware from './middlewares/logger';


const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);
app.use(loggerMiddleware);

const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 3000);
const listener = () => console.log(`Server ready http://${host}:${port}`);

(async () => {
  await init();
  app.listen(port, host, listener);
})();




