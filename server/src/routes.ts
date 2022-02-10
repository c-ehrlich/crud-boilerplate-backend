import { Express, Request, Response } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from './contoller/product.controller';
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from './contoller/session.controller';
import { createUserHandler, getCurrentUser } from './contoller/user.controller';
import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from './schema/product.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';
import logger from './utils/logger';

function routes(app: Express) {
  // If this route returns 200, our app is running
  app.get('/healthcheck', (req: Request, res: Response) => {
    logger.info('Running Health Check');
    res.sendStatus(200);
  });

  /**
   * Users
   */
  app
    .route('/api/users')
    .post(validateResource(createUserSchema), createUserHandler);

  app
    .route('/api/me')
    .get(requireUser, getCurrentUser);

  /**
   * Sessions
   */
  app
    .route('/api/sessions')
    .post(validateResource(createSessionSchema), createUserSessionHandler)
    .get(requireUser, getUserSessionsHandler)
    .delete(requireUser, deleteSessionHandler);

  /**
   * Products
   */
  app
    .route('/api/products')
    .post(
      [requireUser, validateResource(createProductSchema)],
      createProductHandler
    );
  app
    .route('/api/products/:productId')
    .get(validateResource(getProductSchema), getProductHandler)
    .put(
      [requireUser, validateResource(updateProductSchema)],
      updateProductHandler
    )
    .delete(
      [requireUser, validateResource(deleteProductSchema)],
      deleteProductHandler
    );
}

export default routes;
