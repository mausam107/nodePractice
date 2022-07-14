const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

const isAut=require('../middleware/is-aut');


router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

router.get('/orders/:orderId', shopController.getInvoice);

module.exports = router;
