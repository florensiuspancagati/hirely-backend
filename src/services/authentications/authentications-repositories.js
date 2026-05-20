import AuthenticationModel from '../../models/authentications-model.js';

class AuthenticationRepositories {
  async addRefreshToken(token) {
    // create Analyses colection di mongodb
    await AuthenticationModel.create({ token });
  }

  async deleteRefreshToken(token) {
    await AuthenticationModel.deleteOne({ token });
  }

  async verifyRefreshToken(token) {
    const result = await AuthenticationModel.findOne({ token });

    if (!result) {
      return false;
    }

    return result;
  }
}

export default new AuthenticationRepositories();