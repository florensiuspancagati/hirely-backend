import UsersRepositories from './users-repositories.js';
import apiResponse from '../../utils/apiResponse.js';
import InvariantError from '../../exceptions/invariant-error.js';
import NotFoundError from '../../exceptions/not-found-error.js';

const createUser = async (req, res, next) => {
  const { username, password, fullname, email } = req.validated;

  const isUsernameExist = await UsersRepositories.verifyNewUsername(username);
  if (isUsernameExist) {
    return next(new InvariantError('Gagal menambahkan user. Username sudah digunakan'));
  }

  const user = await UsersRepositories.createUser({
    username,
    password,
    fullname,
    email,
  });

  if (!user) {
    return next(new InvariantError('User gagal ditambahkan'));
  }

  return apiResponse(res, 201, 'User berhasil ditambahkan', user);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await UsersRepositories.getUserById(id);

  if (!user) {
    return next(new NotFoundError('User tidak ditemukan'));
  }

  return apiResponse(res, 200, 'User berhasil ditampilkan', { user });
};

const getUserByUsername = async (req, res, next) => {
  const username = req.query.username;
  const user = await UsersRepositories.getUsersByUsername(username);
  if (!user) {
    return next(new NotFoundError('User tidak ditemukan'));
  }
  return apiResponse(res, 200, 'User berhasil ditampilkan', { users: user });
};

export { createUser, getUserById, getUserByUsername };