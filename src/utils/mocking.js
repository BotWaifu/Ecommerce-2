import { faker } from '@faker-js/faker';

export const generateMockProducts = (numProducts = 100) => {
  const products = [];
  for (let i = 0; i < numProducts; i++) {
    const product = {
      _id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
      stock: faker.datatype.number({ min: 0, max: 100 })
    };
    products.push(product);
  }
  return products;
};
