// Express middleware is basically just a route handler, other than where we put it

import { get } from 'lodash'; // makes it a bit safer to access a property that we don't know for sure exists
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';

// we put the user in res.locals so we can use it in e.g. getUserSessionHandler
const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  if (!accessToken) return next();

  const { expired, decoded } = verifyJwt(accessToken);
  console.log("decoded", decoded);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  // defualt return
  return next();
};

export default deserializeUser;