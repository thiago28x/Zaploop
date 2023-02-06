import { Router } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { body, query } from 'express-validator';
import * as controller from '../controllers/contact';
import requestValidator from '../middlewares/request-validator';
import sessionValidator from '../middlewares/session-validator';
import { Request, Response } from 'express';
import { prisma } from '../shared';

const router = Router({ mergeParams: true });




router.get('/contacts', (req, res) => {
  const filePath = path.resolve(__dirname, '../views/contacts.html');
  res.sendFile(filePath);
});


router.get('/start', (req, res) => {
  const filePath = path.resolve(__dirname, '../views/homepage.html');
  res.sendFile(filePath);
});

router.get('/logs', (req, res) => {
  const filePath = path.resolve(__dirname, '../views/logs.html');
  res.sendFile(filePath);
});


router.get('/admin', async (req, res) => {
  try {
    const viewSessions = await prisma.session.findMany({
      select: { sessionId: true, data: true },
    });
    res.json({ viewSessions });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
