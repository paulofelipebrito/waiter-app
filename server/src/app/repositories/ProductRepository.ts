import { Product } from '../models/Product';

class ProductRepository {
  async findAll() {
    return await Product.find();
  }

  async create(name: string, description: string, price: number, category: string, ingredients: any[], imagePath?: string) {
    return await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredients,
    });
  }
}

export default new ProductRepository();
