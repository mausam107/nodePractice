const path = require("path");

const express = require("express");

const Admincontroller = require("../controllers/admin");

const router = express.Router();

router.get("/add-product",Admincontroller.getAddProduct);

router.get("/admin/products",Admincontroller.getProducts);

router.post("/add-product",Admincontroller.postAddProduct );

module.exports = router;


