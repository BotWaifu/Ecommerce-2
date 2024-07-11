import { UserRepository } from "../../repositories/users.repository.js";

class UserManager {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(filter) {
    try {
      return await this.userRepository.getAllUsers(filter);
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      return await this.userRepository.getUserById(id);
    } catch (error) {
      throw new Error(`Error al obtener usuario por ID: ${error.message}`);
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.userRepository.getUserByEmail(email);
    } catch (error) {
      throw new Error(`Error al obtener usuario por email: ${error.message}`);
    }
  }

  async createUser(user) {
    try {
      return await this.userRepository.createUser(user);
    } catch (error) {
      throw new Error(`Error al registrar usuario: ${error.message}`);
    }
  }

  async updateUser(uid, user) {
    try {
      return await this.userRepository.updateUser(uid, user);
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  }

  async updateUserByEmail(userEmail, user) {
    try {
      return await this.userRepository.updateUserByEmail(userEmail, user);
    } catch (error) {
      throw new Error(`Error al actualizar el usuario por email: ${error.message}`);
    }
  }
}

export default UserManager;
