import { Request, Response } from 'express';

import ProductRepository from '../repositories/ProductRepository';

class ProductController {
  async listProducts(_request: Request, response: Response) {
    try {
      const products = await ProductRepository.findAll();
      return response.json(products);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }

  async createProduct(request: Request, response: Response) {
    try {
      const imagePath = request.file?.filename;
      const { name, description, price, category, ingredients } = request.body;

      const ingredientsToRequest = ingredients ? JSON.parse(ingredients) : [];
      const product = await ProductRepository.create(
        name,
        description,
        Number(price),
        category,
        imagePath,
        ingredientsToRequest
      );
      return response.status(201).json(product);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
}

export default new ProductController();
