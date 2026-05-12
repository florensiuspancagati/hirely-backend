import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

import User from '../../models/users-model.js';

class UserRepositories {
  async createUser({ username, password, fullname, email }) {
    const id = nanoid(16);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
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
    const user = await User.findOne({ username });

    return !!user;
  }

  async getUserById(id) {
    return await User.findOne({ id });
  }

  async verifyUserCredential(username, password) {
    const user = await User.findOne({ username });

    if (!user) {
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return null;
    }

    return user.id;
  }

  async getUsersByUsername(username) {
    return await User.find(
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