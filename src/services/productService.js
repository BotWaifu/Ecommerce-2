import ProductManager from "../dao/MongoDB/ProductManagerDB.js";

const productManager = new ProductManager(); // Corregido el nombre de la instancia

const getAllProducts = async () => {
  return await productManager.getAllProducts();
};

const getPaginateProducts = async (searchQuery, options) => {
  return await productManager.getPaginateProducts(searchQuery, options);
};

const getProductByID = async (pid) => {
  return await productManager.getProductByID(pid);
};

const createProduct = async (productData) => {
  return await productManager.createProduct(productData);
};

const updateProduct = async (pid, productData) => {
  return await productManager.updateProduct(pid, productData);
};

const deleteProduct = async (pid) => {
  return await productManager.deleteProduct(pid);
};

export default {
  getAllProducts,
  getPaginateProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
};
