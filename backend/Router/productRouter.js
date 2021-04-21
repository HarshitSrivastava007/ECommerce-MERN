import express from 'express'
const router= express.Router()
import {getProducts, getProductById, deleteProduct,createProduct,updateProduct, getTopProducts } from '../Controller/productController.js'
import { protect, admin } from '../MiddlewareExceptionHandler/authMiddleware.js'


router.get('/top', getTopProducts)
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById)
                     .delete(protect, admin, deleteProduct)
                     .put(protect, admin, updateProduct)


 


export default router 