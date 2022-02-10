import express from 'express';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';
import cors from 'cors';
import config from 'config';
import cookieParser from 'cookie-parser';

function createServer() {
  const app = express();
  app.use(express.json());
  // make sure to use cookieParser BEFORE any middleware that needs stuff from cookies!
  app.use(cookieParser());
  app.use(cors({
    origin: config.get('origin'),
    credentials: true, // expect credentials header
  }));

  app.use(deserializeUser); // create res.locals.user when possible
  console.log("in createServer");
  routes(app);
  return app;
}

export default createServer;