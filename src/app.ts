import express from 'express';
import cors from 'cors';
import { Response } from 'express'
import routerApi from './routes';

function createApp() {
  const app = express();

  const whitelist = [
    'http://localhost:3000'
  ]

  app.use(cors({origin: whitelist}));

  app.use(express.json());

  app.get('/', (_req, res: Response) => {
    res.send('bot schedule is aliveeee')
  });

  routerApi(app);

  return app;
}

export default createApp;