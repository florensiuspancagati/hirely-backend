import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

import UserModel from '../../models/users-model.js';

class UserRepositories {
  async createUser({ username, password, fullname, email }) {
    const id = nanoid(16);
    const hashedPassword = await bcrypt.hash(password, 10);

    // create User colection di mongodb
    const user = await UserModel.create({
      id,
      username,
      fullname,
      password: hashedPassword,
      email,
    });

    return {
      id: user.id,
    };
  }

  async verifyNewUsername(username) {
    const user = await UserModel.findOne({ username });

    return !!user;
  }

  async getUserById(id) {
    return await UserModel.findOne({ id });
  }

  async verifyUserCredential(email, password) {
    const chekedEmail = await UserModel.findOne({ email });

    if (!chekedEmail) {
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      chekedEmail.password
    );

    if (!isPasswordMatch) {
      return null;
    }

    return chekedEmail.id;
  }

  async getUsersByUsername(username) {
    return await UserModel.find(
      // regex itu pencarian string. option i itu case insensitive.
      {
        username: { $regex: username, $options: 'i' },
      },
      // 1 artinya tampilkan, 0 artinya jangan.
      {
        _id: 0,
        id: 1,
        username: 1,
        fullname: 1,
      }
    );
  }
}

export default new UserRepositories();