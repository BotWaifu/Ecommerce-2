import CartManager from "../dao/MongoDB/CartManagerDB.js";

const cartManager = new CartManager();

const getAllCarts = async () => {
  return await cartManager.getAllCarts();
};

const getCartById = async (cid) => {
  return await cartManager.getCartById(cid);
};

const createCart = async (products) => {
  return await cartManager.createCart(products);
};

const addProductByID = async (cid, pid) => {
  return await cartManager.addProductByID(cid, pid);
};

const deleteProductInCart = async (cid, pid) => {
  return await cartManager.deleteProductInCart(cid, pid);
};

const updateCart = async (cid, products) => {
  return await cartManager.updateCart(cid, products);
};

const updateProductQuantity = async (cid, productId, quantity) => {
  return await cartManager.updateProductQuantity(cid, productId, quantity);
};

const clearCart = async (cid) => {
  return await cartManager.clearCart(cid);
};

const getTotalQuantityInCart = async (cid) => {
  return await cartManager.getTotalQuantityInCart(cid);
};

export default {
  getAllCarts,
  getCartById,
  createCart,
  addProductByID,
  deleteProductInCart,
  updateCart,
  updateProductQuantity,
  clearCart,
  getTotalQuantityInCart,
};
