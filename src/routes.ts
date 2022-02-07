import { Express, Request, Response } from 'express';

function routes(app: Express) {
  // if this route returns 200, our app is running
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
}

export default routes;