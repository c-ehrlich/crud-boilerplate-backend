import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';
import logger from '../utils/logger';

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send('Invalid email or password');

  // Create a session
  const session = await createSession(user._id, req.get('user-agent') || '');

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

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session; // we put the requireUser middleware in front of this

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
