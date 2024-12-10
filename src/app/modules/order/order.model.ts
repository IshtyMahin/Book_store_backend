import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number },
  },
  { timestamps: true },
);

export const Order = model<TOrder>('Order', OrderSchema);
