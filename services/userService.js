import User from '../models/Users.js';

class UserService {
  static async findUserByEmail(email) {
    return User.findOne({ email }).select('+password');
  }

  static async findUserById(userId) {
    return User.findById(userId).select('+password');
  }

  static async updateUserPassword(userId, hashedPassword) {
    return User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
  }

  static async updateUserProfile(userId, updates) {
    return User.findByIdAndUpdate(userId, { $set: updates }, { new: true });
  }
}

export default UserService;
