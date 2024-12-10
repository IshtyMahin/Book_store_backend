import { TOrder } from './order.interface';
import { Order } from './order.model';
import { Book } from '../product/product.model';

const createOrderInDB = async (orderData: TOrder) => {
  const { product, quantity } = orderData;

  const book = await Book.findById(product);
  if (!book) throw new Error('Book not found');
  if (book.quantity < quantity) throw new Error('Insufficient stock');

  const totalPrice = book.price * quantity;

  book.quantity -= quantity;
  book.inStock = book.quantity > 0;
  await book.save();

  const order = new Order({ ...orderData, totalPrice });
  await order.save();
  return order;
};

const calculateTotalRevenue = async () => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return revenue[0]?.totalRevenue || 0;
};

export const OrderServices = {
  createOrderInDB,
  calculateTotalRevenue,
};
