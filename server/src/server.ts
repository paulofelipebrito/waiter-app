import express from 'express';
import mongoose from 'mongoose';
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';
import { cors } from './app/middlewares/cors';
import { errorHandler } from './app/middlewares/errorHandler';

import { router } from './router';

const app = express();
const PORT = 3001;
const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.use(express.json());
    app.use(cors);
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    app.use(router);

    app.use(errorHandler);
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => console.log('Error connecting to MongoDB'));
