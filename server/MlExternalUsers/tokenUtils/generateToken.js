import jwt from 'jsonwebtoken';

async function generateToken(payload, expiresIn) {
  const token = jwt.sign(payload, 'secret', { expiresIn });
  return token;
}
module.exports = generateToken;
