import AuthenticationRepositories from './authentications-repositories.js';
import UserRepositories from '../users/users-repositories.js';
import TokenManager from '../../security/token-manager.js';
import apiResponse from '../../utils/apiResponse.js';
import InvariantError from '../../exceptions/invariant-error.js';
import AuthenticationError from '../../exceptions/authentication-error.js';

const login = async (req, res, next) => {
  const { username, password } = req.validated;
  const userId = await UserRepositories.verifyUserCredential(username, password);

  if (!userId) {
    return next(new AuthenticationError('Kredensial yang Anda berikan salah'));
  }

  const accessToken = TokenManager.generateAccessToken({ id: userId });
  const refreshToken = TokenManager.generateRefreshToken({ id: userId });

  await AuthenticationRepositories.addRefreshToken(refreshToken);

  return apiResponse(res, 201, 'Authentication berhasil ditambahkan', {
    accessToken,
    refreshToken,
  });
};

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.validated;

  const result = await AuthenticationRepositories.verifyRefreshToken(refreshToken);

  if (!result) {
    return next(new InvariantError('Refresh token tidak valid'));
  }

  const { id } = TokenManager.verifyRefreshToken(refreshToken);
  const accessToken = TokenManager.generateAccessToken({ id });

  return apiResponse(res, 200, 'Access Token berhasil diperbarui', { accessToken });
};

const logout = async (req, res, next) => {
  const { refreshToken } = req.validated;

  const result = await AuthenticationRepositories.verifyRefreshToken(refreshToken);

  if (!result) {
    return next(new InvariantError('Refresh token tidak valid'));
  }

  await AuthenticationRepositories.deleteRefreshToken(refreshToken);

  return apiResponse(res, 200, 'Refresh token berhasil dihapus');
};

export { login, refreshToken, logout };