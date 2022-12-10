import { Order } from '../models/Order';

class OrderRepository {
  async findAll() {
    return await Order.find().sort({ createdAt: 1 })
      .populate('products.product');
  }

  async create(products: string, table: string) {
    return await (await Order.create({ products, table })).populate('products.product');
  }

  async update(orderId: string, status: string) {
    return await Order.findByIdAndUpdate(orderId, { status });
  }

  async delete(orderId: string) {
    return await Order.findByIdAndDelete(orderId);
  }
}

export default new OrderRepository();
