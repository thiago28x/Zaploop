import type { RequestHandler } from 'express';
import { validationResult } from 'express-validator';






const validate: RequestHandler = (req, res, next) => {

  console.log(`Request made from IP: ${req.ip} to route: ${req.url}`);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

export default validate;
