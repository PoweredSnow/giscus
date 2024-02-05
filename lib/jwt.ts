import { sign } from 'jsonwebtoken';
import { env } from './variables';

export function getJWT() {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    // Issued at time, 60 seconds in the past to allow for clock drift
    iat: now - 60,
    // JWT expiration time (10 minute maximum)
    exp: now + 10 * 60,
    // GitHub App's identifier
    iss: env.app_id,
  };
  const private_key = env.private_key.replace(/\\n/g, '\n');
  return sign(payload, private_key, { algorithm: 'RS256' });
}
