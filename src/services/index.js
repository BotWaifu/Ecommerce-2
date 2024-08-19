import { carts, products, users, tickets, resetPasswordCodes, messages } from "../dao/factory.js";

import CartsRepository from "./cartService.js";
import ProductsRepository from "./productService.js";
import UsersRepository from "./userService.js";
import TicketsRepository from "./ticketService.js";
import ResetPasswordRepository from "./resetPasswordService.js";
import MessagesRepository from "./messageService.js";

export const cartService = new CartsRepository(carts);
export const productService = new ProductsRepository(products);  // Aquí ya no necesitas usar `new`
export const userService = new UsersRepository(users);
export const ticketService = new TicketsRepository(tickets);
export const resetPasswordService = new ResetPasswordRepository(resetPasswordCodes);
export const messageService = new MessagesRepository(messages);
