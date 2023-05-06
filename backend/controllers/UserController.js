const User = require("../models/User");

const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET; 

// Generate user Token 
const GenerateToken = (id) => { 
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d"
    });
};

// register user and sing in 
const register = async (req, res) => {
    res.send("Registro")
}

module.exports = {
    register
}

