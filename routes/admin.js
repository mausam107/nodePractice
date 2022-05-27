const path = require('path');

const express = require('express');

const { body } = require("express-validator/check");

const adminController = require('../controllers/admin');

const isAut=require('../middleware/is-aut');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product',isAut,adminController.getAddProduct);

router.post('/add-product',[
    body('title')
        .isString()
        .isLength({min:3})
        .trim()
        ,
    body('imageUrl')
        .isURL(),
    body('price')
        .isFloat(),
    body('description')
    .isLength({min:5,max:400})
    .trim()
],
isAut, adminController.postAddProduct);

// // /admin/products => GET
router.get('/products',isAut, adminController.getProducts);

router.get('/edit-product/:productId',isAut, adminController.getEditProduct);

router.post('/edit-product',[
    body('title')
        .isString()
        .isLength({min:3})
        .trim(),
    body('imageUrl')
        .isURL(),
    body('price')
        .isFloat(),
    body('description')
        .isLength({min:5,max:400})
        .trim()
],
isAut, adminController.postEditProduct);

router.post('/delete-product',isAut,adminController.postDeleteProduct);
module.exports = router;
