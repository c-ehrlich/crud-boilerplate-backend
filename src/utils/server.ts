import express from 'express';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';

function createServer() {
  const app = express();
  app.use(express.json());
  app.use(deserializeUser); // create res.locals.user when possible
  routes(app);
  return app;
}

export default createServer;