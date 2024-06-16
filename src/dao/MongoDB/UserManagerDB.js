import { userModel } from '../../models/userModel.js';

class UserManager {
  async getUserByEmail(email) {
    return await userModel.findOne({ email }).populate('cart');
  }

  async getUserById(id) {
    return await userModel.findById(id).populate('cart');
  }

  async createUser(user) {
    return await userModel.create(user);
  }

  async updateUser(user) {
    return await userModel.findByIdAndUpdate(user._id, user, { new: true }).populate('cart');
  }

  // Otros métodos...
}

export default UserManager;

