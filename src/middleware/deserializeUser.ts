// Express middleware is basically just a route handler, other than where we put it

import { get } from 'lodash'; // makes it a bit safer to access a property that we don't know for sure exists
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

// we put the user in res.locals so we can use it in e.g. getUserSessionHandler
const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );
  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) return next();

  const { expired, decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  // if the user doesn't have an access token, try to create a new one from refresh token
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      // set a new header with that accessToken
      res.setHeader('x-access-token', newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string);

    res.locals.use = result.decoded
    return next();
  }

  return next();
};

export default deserializeUser;