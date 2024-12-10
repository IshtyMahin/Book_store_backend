/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { orderValidationSchema } from './order.joi.validation';

const handleSuccessMessage = (
  res: Response,
  message: string,
  data: any = {},
) => {
  return res.status(200).json({ message, success: true, data });
};

const handleErrorMessage = (res: Response, message: string, error: any) => {
  return res.status(400).json({ message, success: false, error });
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { error } = orderValidationSchema.validate(req.body);
    if (error) {
      return handleErrorMessage(
        res,
        'Validation error',
        error.details[0].message,
      );
    }

    const order = await OrderServices.createOrderInDB(req.body);
    return handleSuccessMessage(res, 'Order created successfully', order);
  } catch (err: any) {
    return handleErrorMessage(res, 'Failed to create order', err.message);
  }
};

const calculateRevenue = async (_req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateTotalRevenue();
    return handleSuccessMessage(res, 'Revenue calculated successfully', {
      totalRevenue,
    });
  } catch (err: any) {
    return handleErrorMessage(res, 'Failed to calculate revenue', err.message);
  }
};

export const OrderController = {
  createOrder,
  calculateRevenue,
};
