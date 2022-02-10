import jwt from 'jsonwebtoken';
import config from 'config';
import log from './logger';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

// 'object' is the JWT payload
export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  // sign with private key
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt(token: string) {
  // verify with public key
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    log.error(e.message);
    return {
      valid: false,
      expired: true,
      // expired: e.message === 'jwt expired', // this is how it was before, i believe the error messages of jwt.verify were different at the time
      decoded: null,
    };
  }
}
