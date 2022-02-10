import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import logger from '../utils/logger';

// handler to create a user
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body); // call create user service
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message); // Confict
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  // if we put the requireUser middleware before this, we can assume the user
  // is on the response object
  return res.send(res.locals.user);
}
