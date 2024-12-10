/* eslint-disable @typescript-eslint/no-explicit-any */
import { TBook } from './product.interface';
import { Book } from './product.model';

const createBookIntoDB = async (bookData: TBook) => {
  const result = await Book.create(bookData);
  return result;
};

const getAllBooksFromDB = async (filter: any = {}) => {
  const result = await Book.find(filter);
  return result;
};

const getSingleBookFromDB = async (id: string) => {
  const result = await Book.findById(id);
  return result;
};

const deleteBookFromDB = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

const updateBookInDB = async (id: string, updatedBookData: TBook) => {
  const result = await Book.findByIdAndUpdate(id, updatedBookData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  deleteBookFromDB,
  updateBookInDB,
};
