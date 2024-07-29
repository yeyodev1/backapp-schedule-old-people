import express, { Application } from 'express';

import user from './user';

function routerApi(app: Application) {
  const router = express.Router();

  app.use('/api', router);

  router.use(user);
}

export default routerApi