import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toLocaleString();
  console.log(`Request made from IP: ${req.ip} to route: ${req.url}`);
  fs.appendFile("logs.csv", `${timestamp}, ${req.ip}, ${req.url}\n`, function (err) {
  if (err) throw err;
  });
  next();
  };

export default loggerMiddleware;
