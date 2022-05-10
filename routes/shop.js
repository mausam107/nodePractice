const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

const isAut=require('../middleware/is-aut');


router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProduct);

router.get('/cart',isAut, shopController.getCart);

router.post('/cart',isAut, shopController.postCart);

router.post('/cart-delete-item',isAut, shopController.postCartDeleteProduct);

router.post('/create-order',isAut, shopController.postOrder);

router.get('/orders',isAut, shopController.getOrders);

module.exports = router;
