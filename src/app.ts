import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { BookRoute } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', BookRoute);
app.use('/api/orders', OrderRoutes);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to book store',
  });
};

app.get('/', getAController);

export default app;
