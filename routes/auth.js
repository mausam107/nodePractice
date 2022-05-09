const express = require("express");

const router = express.Router();

const authcontroller=require('../controllers/auth')

router.get('/login',authcontroller.getLogin);

router.post('/login',authcontroller.postLogin);

router.post('/logout',authcontroller.postLogout);

module.exports=router;
