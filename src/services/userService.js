import UserManager from "../dao/MongoDB/UserManagerDB.js";
import CartRepository from "../repositories/cartRepository.js"; // Asegúrate de importar el CartRepository

const userManager = new UserManager();
const cartRepository = new CartRepository();

const getAllUsers = async (filter) => {
  return await userManager.getAllUsers(filter);
};

const getUserById = async (id) => {
  return await userManager.getUserById(id);
};

const getUserByEmail = async (email) => {
  return await userManager.getUserByEmail(email);
};

const createUser = async (user) => {
  // Crear el usuario
  const newUser = await userManager.createUser(user);
  
  // Crear un carrito vacío y asignarlo al usuario
  const cart = await cartRepository.createCart({});
  newUser.cart = cart._id;
  console.log('New User Cart ID:', newUser.cart); // Verificar el ID del carrito

  // Guardar el usuario con el carrito asignado
  await newUser.save();

  return newUser;
};


const updateUser = async (user) => {
  return await userManager.updateUser(user);
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
};
