import jwt from 'jsonwebtoken';
import { MagicStrings, StringConstants } from '../core/errorConstants';

const magicStrings = new MagicStrings();
const stringConstants = new StringConstants();

async function validateToken(token) {
  if (token) {
    let tokenVerificationResult;
    try {
      tokenVerificationResult = await jwt.verify(token, magicStrings.jwtSecret);
    } catch (err) {
      if (err) {
        return ({ success: false, message: stringConstants.authenticationFailed, payload: null });
      }
    }
    return ({ success: true, message: stringConstants.authenticationSuccessful, payload: tokenVerificationResult });
  }
  return ({ success: false, message: stringConstants.authenticationFailed, payload: null });
}

module.exports = validateToken;
