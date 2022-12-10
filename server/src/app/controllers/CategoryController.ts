import { Request, Response } from 'express';

import CategoryRepository from '../repositories/CategoryRepository';

class CategoryController {
  async listCategories(request: Request, response: Response) {
    try {
      const categories = await CategoryRepository.findAll();
      return response.json(categories);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }

  async listProductsByCategory(
    request: Request,
    response: Response
  ) {
    try {
      const { categoryId } = request.params;
      const products = await CategoryRepository.findProductsByCategory(categoryId);
      return response.json(products);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }

  async createCategory(request: Request, response: Response) {
    try {
      const { icon, name } = request.body;
      const category = await CategoryRepository.createCategory(icon, name);
      return response.status(201).json(category);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
}

export default new CategoryController();
