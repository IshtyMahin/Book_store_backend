import { model, Schema } from 'mongoose';
import { TBook } from './product.interface';

const BookSchema = new Schema<TBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

BookSchema.statics.isBookExists = async function (id: string) {
  const existingBook = await Book.findOne({ id });
  return existingBook;
};

export const Book = model<TBook>('Book', BookSchema);
