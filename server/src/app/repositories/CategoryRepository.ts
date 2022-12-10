import { Category } from '../models/Category';
import { Product } from '../models/Product';

class CategoryRepository {
  async findAll() {
    return await Category.find();
  }

  async findProductsByCategory(
    categoryId: string
  ) {
    return await Product.find().where('category').equals(categoryId);
  }

  async createCategory(icon: string, name: string) {
    return await Category.create({ icon, name });
  }
}

export default new CategoryRepository();
