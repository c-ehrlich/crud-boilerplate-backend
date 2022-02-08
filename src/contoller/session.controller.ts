import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { createSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';
import logger from '../utils/logger';

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);
  logger.info('user: ' + user);

  if (!user) return res.status(401).send('Invalid email or password');

  // Create a session
  const session = await createSession(user._id, req.get('user-agent') || '');
  logger.info('session: ' + session);

  // Create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') } // 15 Minutes
  );

  // Create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('refreshTokenTtl') } // 1 Year
  );

  // Return access and refresh tokens
  return res.send({ accessToken, refreshToken });
}
