import mongoose from "mongoose";
import CartRepository from "../../repositories/carts.repository.js";
import { cartModel } from "../../models/cartModel.js";

class CartManager {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  async getAllCarts() {
    return await this.cartRepository.getAllCarts();
  }

  async getCartById(cid) {
    return await this.cartRepository.getCartById(cid);
  }

  async createCart(products) {
    return await this.cartRepository.createCart(products);
  }

  async addProductByID(cid, pid) {
    if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
      throw new Error("Invalid cart ID or product ID");
    }
    try {
      const cart = await cartModel.findOne({ _id: cid });
      if (!cart) {
        throw new Error(`El carrito ${cid} no existe`);
      }
      const existingProductIndex = cart.products.findIndex((product) => product.product.toString() === pid);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }
      await cart.save();
      return cart;
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      throw error;
    }
  }

  async deleteProductInCart(cid, pid) {
    return await this.cartRepository.deleteProductInCart(cid, pid);
  }

  async updateCart(cid, products) {
    return await this.cartRepository.updateCart(cid, products);
  }

  async updateProductQuantity(cid, productId, quantity) {
    return await this.cartRepository.updateProductQuantity(cid, productId, quantity);
  }

  async clearCart(cid) {
    return await this.cartRepository.clearCart(cid);
  }

  async getTotalQuantityInCart(cid) {
    return await this.cartRepository.getTotalQuantityInCart(cid);
  }
}

export default CartManager;
