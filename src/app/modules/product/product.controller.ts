/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BookServices } from './product.service';
import { bookValidationSchema } from './product.joi.validation';
import { Book } from './product.model';

const handleSuccessMessage = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = {},
) => {
  return res.status(statusCode).json({
    message,
    success: true,
    data,
  });
};

const handleErrorMessage = (
  res: Response,
  statusCode: number,
  message: string,
  err: any,
) => {
  const errorResponse = {
    message,
    success: false,
    error: {
      name: 'UnknownError',
      details: [],
    },
    stack: 'No stack available',
  };

  if (err.isJoi && err.details) {
    errorResponse.error.name = 'ValidationError';
    errorResponse.error.details = err.details.map((detail: any) => ({
      path: detail.path.join('.'),
      message: detail.message,
      type: detail.type,
      context: detail.context,
    }));
    errorResponse.stack = new Error().stack || 'No stack available';
  } else if (err instanceof Error) {
    errorResponse.error.name = err.name;
    errorResponse.error.details = [
      {
        message: err.message || 'An unknown error occurred',
      },
    ];
    errorResponse.stack = err.stack || 'No stack available';
  }

  return res.status(statusCode).json(errorResponse);
};

const removeFields = (book: any) => {
  const bookObject = book.toObject();
  delete bookObject._id;
  delete bookObject.createdAt;
  delete bookObject.updatedAt;
  delete bookObject.__v;
  return bookObject;
};

const validateBookData = (bookData: any, res: Response) => {
  const { error } = bookValidationSchema.validate(bookData);
  if (error) {
    return handleErrorMessage(res, 400, 'Validation failed', error);
  }
  return null;
};

const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const validationError = validateBookData(bookData, res);
    if (validationError) return validationError;

    const result = await BookServices.createBookIntoDB(bookData);
    const book = result.toObject();
    delete book.__v;

    return handleSuccessMessage(res, 200, 'Book created successfully', book);
  } catch (err) {
    return handleErrorMessage(res, 500, 'Failed to create book', err);
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    let filter = {};

    if (searchTerm) {
      filter = {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { author: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      };
    }

    const result = await BookServices.getAllBooksFromDB(filter);

    return handleSuccessMessage(
      res,
      200,
      'Books retrieved successfully',
      result,
    );
  } catch (err) {
    return handleErrorMessage(res, 500, 'Failed to retrieve books', err);
  }
};

const getSingleBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BookServices.getSingleBookFromDB(productId);

    if (!result) {
      return handleErrorMessage(res, 404, 'Book not found', {});
    }

    return handleSuccessMessage(
      res,
      200,
      'Book retrieved successfully',
      result,
    );
  } catch (err) {
    return handleErrorMessage(res, 500, 'Failed to retrieve book', err);
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await BookServices.deleteBookFromDB(productId);

    if (!result) {
      return handleErrorMessage(res, 404, 'Book not found', {});
    }

    return handleSuccessMessage(res, 200, 'Book deleted successfully', {});
  } catch (err) {
    return handleErrorMessage(res, 500, 'Failed to delete book', err);
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedBookData = req.body;

    const book = await Book.findById(productId);
    if (!book) {
      return handleErrorMessage(res, 404, 'Book not found', {});
    }

    const bookObject = removeFields(book);
    Object.assign(bookObject, updatedBookData);

    const validationError = validateBookData(bookObject, res);
    if (validationError) return validationError;

    const result = await BookServices.updateBookInDB(productId, bookObject);
    if (!result) {
      return handleErrorMessage(res, 404, 'Book not found', {});
    }

    const updatedBook = result.toObject();
    delete updatedBook.__v;

    return handleSuccessMessage(
      res,
      200,
      'Book updated successfully',
      updatedBook,
    );
  } catch (err) {
    return handleErrorMessage(res, 500, 'Failed to update book', err);
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
};
