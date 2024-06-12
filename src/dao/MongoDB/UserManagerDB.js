// dao/MongoDB/UserManagerDB.js
import { userModel } from "../../models/userModel.js";

class UserManager {
  async getAllUsers(filter) {
    return await userModel.find(filter);
  }

  async getUserById(id) {
    return await userModel.findById(id);
  }

  async getUserByEmail(email) {
    return await userModel.findOne({ email });
  }

  async createUser(user) {
    return await userModel.create(user);
  }

  async updateUser(user) {
    return await userModel.findByIdAndUpdate(user._id, user, { new: true });
  }
}

export default UserManager;