import { Express, Request, Response } from 'express';
import { createUserSessionHandler } from './contoller/session.controller';
import { createUserHandler } from './contoller/user.controller';
import validateResource from './middleware/validateResource';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
  // If this route returns 200, our app is running
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // Create a user
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  // Create a session
  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
}

export default routes;
