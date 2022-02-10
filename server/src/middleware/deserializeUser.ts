// Express middleware is basically just a route handler, other than where we put it

import { get } from 'lodash'; // makes it a bit safer to access a property that we don't know for sure exists
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

// we put the user in res.locals so we can use it in e.g. getUserSessionHandler
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the accessToken from the cookie OR from the header
  const accessToken =
    get(req, 'cookies.accessToken') ||
    get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  // get the refreshToken from the cookie OR from the header
  const refreshToken =
    get(req, 'cookies.refreshToken') || get(req, 'headers.x-refresh');

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

      // set a new cookie for access token
      // if the client wants to use localStorage then they can, because we set the header above
      // but we prefer to use a cookie because it's safer
      res.cookie('accessToken', accessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true, // can not access this cookie with JavaScript
        domain: 'localhost', // TODO set this in config instead!!!
        path: '/',
        sameSite: 'strict',
        secure: false, // can only be used over https - TODO have an is-production flag here that determines this
      });
    }

    const result = verifyJwt(newAccessToken as string);

    res.locals.use = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
