const express = require('express');
const router = express.Router();

// controller 
const { register, login, getCurrentUser } = require("../controllers/UserController");

// middlewares para criar o methodo de aclopamento dos erros em array 
const validate = require("../middlewares/handleValidation");

// Middle de validaçoes de cada campo de dado
const { userCreateValidation, loginValidation } = require("../middlewares/userValidations");

// 
const authGuard = require('../middlewares/authGuard');

// Routes 
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser );


module.exports = router