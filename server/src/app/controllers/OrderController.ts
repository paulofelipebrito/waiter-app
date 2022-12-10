import { Request, Response } from 'express';
import { io } from '../../server';

import OrderCategory from '../repositories/OrderRepository';

class OrderController {
  async listOrders(_request: Request, response: Response) {
    try {
      const orders = await OrderCategory.findAll();
      return response.json(orders);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }

  async createOrder(request: Request, response: Response) {
    try {
      const { products, table } = request.body;
      const order = await OrderCategory.create(products, table);
      io.emit('orders@new', order);
      return response.status(201).json(order);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }

  async changeOrderStatus(request: Request, response: Response) {
    try {
      const { orderId } = request.params;
      const { status } = request.body;
      if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
        return response.status(400).json({
          error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE',
        });
      }
      await OrderCategory.update(orderId, status);
      return response.sendStatus(204);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }

  async cancelOrder(request: Request, response: Response) {
    try {
      const { orderId } = request.params;
      await OrderCategory.delete(orderId);
      return response.sendStatus(204);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
}

export default new OrderController();
