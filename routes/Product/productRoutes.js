import express from 'express';
import { createProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, deleteProductController, getAllProductController } from '../../controllers/product/productController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import ExpressFormidable from 'express-formidable';

const router = express.Router();

// Create a product
router.post('/create-product', authMiddleware, ExpressFormidable(), createProductController);

// Get all products
router.get('/get-all-product', getAllProductController);

// get by seller id products
router.get('/get-product/:id', getProductController);

// get single product
router.get('/getone-product/:pid', getSingleProductController);

// get photo
router.get('/product-photo/:pid', productPhotoController);

// update product
router.put('/update-product/:pid',authMiddleware,ExpressFormidable(), updateProductController);

// delete product
router.delete('/delete-product/:pid',authMiddleware, deleteProductController);

export default router;