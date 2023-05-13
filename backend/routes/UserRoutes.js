const express = require('express');
const router = express.Router();

// controller 
const { register, login, getCurrentUser, update, getUserById } = require("../controllers/UserController");

// middlewares para criar o methodo de aclopamento dos erros em array 
const validate = require("../middlewares/handleValidation");

// middleware de image 
const {  imageUpload } = require('../middlewares/imageUpload');

// Middle de validaçoes de cada campo de dado
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations");

// verificaçao de token e validaçao
const authGuard = require('../middlewares/authGuard');

// Routes 
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser );
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update);
router.get("/:id", getUserById )


module.exports = router