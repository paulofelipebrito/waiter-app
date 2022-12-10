import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';

import CategoryController from './app/controllers/CategoryController';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(_request, _file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(_request, file, callback) {
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

router.get('/categories', CategoryController.listCategories);

router.get('/categories/:categoryId/products', CategoryController.listProductsByCategory);

router.post('/categories', CategoryController.createCategory);

router.get('/products', ProductController.listProducts);

router.post('/products', upload.single('image'), ProductController.createProduct);

router.get('/orders', OrderController.listOrders);

router.post('/orders', OrderController.createOrder);

router.patch('/orders/:orderId', OrderController.changeOrderStatus);

router.delete('/orders/:orderId', OrderController.cancelOrder);
