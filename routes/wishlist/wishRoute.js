import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import {  addToWishlistController, removeFromWishlistController, getUserWishlistController } from '../../controllers/wishlist/wishListController.js';

const router = express.Router();

// get all wishlist by user id
 router.get('/:id', authMiddleware, getUserWishlistController);

// add to wishlist
router.post('/add-to-wishlist', authMiddleware, addToWishlistController);

// remove from wishlist
router.delete('/remove/:id', authMiddleware, removeFromWishlistController);


export default router;