import JWT from 'jsonwebtoken';
import InvariantError from '../exceptions/invariant-error.js';

const TokenManager = {
  generateAccessToken: (payload) => JWT.sign(payload, process.env.ACCESS_TOKEN_KEY),
  
  generateRefreshToken: (payload) => JWT.sign(payload, process.env.REFRESH_TOKEN_KEY),

  verifyRefreshToken: (refreshToken) => {
    try {
      const payload = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      return payload;
    } catch (error) {
      console.log(error);
      throw new InvariantError('Refresh token tidak valid');
    }
  },

  verify: (accessToken, secret) => {
    try {
      const payload = JWT.verify(accessToken, secret);
      return payload;
    } catch (error) {
      console.log(error);
      throw new InvariantError('Access token tidak valid');
    }
  }
};

export default TokenManager;