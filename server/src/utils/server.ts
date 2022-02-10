import express from 'express';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';
import cors from 'cors';
import config from 'config';

function createServer() {
  const app = express();
  app.use(express.json());
  app.use(deserializeUser); // create res.locals.user when possible
  app.use(cors({
    origin: config.get('origin'),
    credentials: true, // expect credentials header
  }));
  routes(app);
  return app;
}

export default createServer;