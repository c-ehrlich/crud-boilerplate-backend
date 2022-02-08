import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { createSession, findSessions } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';
import logger from '../utils/logger';
import { appendFile } from 'fs';

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);
  logger.info('user: ' + JSON.stringify(user));

  if (!user) return res.status(401).send('Invalid email or password');

  // Create a session
  const session = await createSession(user._id, req.get('user-agent') || '');
  logger.info('session: ' + JSON.stringify(session));

  // Create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>('accessTokenTtl') } // 15 Minutes
  );

  // Create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>('refreshTokenTtl') } // 1 Year
  );

  // Return access and refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  console.log("userId", userId);

  const sessions = await findSessions({ user: userId, valid: true });

  console.log("sessions", {sessions});

  return res.send(sessions);
}
