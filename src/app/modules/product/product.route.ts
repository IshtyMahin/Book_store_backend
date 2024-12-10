import express from 'express';
import { BookController } from './product.controller';
const router = express.Router();

router.post('', BookController.createBook);
router.get('', BookController.getAllBooks);
router.get('/:productId', BookController.getSingleBook);
router.put('/:productId', BookController.updateBook);
router.delete('/:productId', BookController.deleteBook);

export const BookRoute = router;
