//  model User
const User = require("../models/User");
const mongoose = require('mongoose');

// ciptografia da senha
const bcrypt = require("bcryptjs"); 

// tools de jsonwebtoken
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET; 

// Generate user Token 
const generateToken = (id) => { 
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d"
    });
};

// register user and sing in 
const register = async (req, res) => {
   
    const { name, email, password } = req.body; 

    // check if user exists 
    const user = await User.findOne({ email }); 

    if (user) {
        res.status(422).json({errors: ["Por favor, utilize outro e-mail"]});
        return
    }

    // Generate password hash 
    const salt = await bcrypt.genSalt(); 
    const passwordHash = await bcrypt.hash(password, salt); 

    // create user 

    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // If was created succefully, return the token 
    if (!newUser) {
        res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde."] })
        return
    }

    res.status(201).json({ 
        _id: newUser._id,
        token: generateToken(newUser._id),
    }) 
}

//  get current logged in user 
const getCurrentUser = async (req, res) => {  
    
    const user = req.user; 
    
    res.status(200).json(user);
}; 


const login = async (req, res) => { 
    
    const { email, password } = req.body; 

    const user = await User.findOne({ email: email});

    // check if user exist
    if (!user) {
        res.status(422).json({ errors: ["Usuário não encontrado."] })
        return
    }

    if (!(await bcrypt.compare(password, user.password))) {
         res.status(422).json({ errors: [`${user.name} sua senha esta incorreta.`]});
         return;
    }

    // return user with token 
    res.status(201).json({ 
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    }) 
}; 


// update de usuario
const update = async (req, res) => {
   const { name, password, bio } = req.body; 

   let profileImage = null 

   if (req.file) {
     profileImage = req.file.filename; 
   }

   const reqUser = req.user

   const user = await User.findById(reqUser._id.toString()).select("-password");

   if (name) {
    user.name = name 
   } 

   if (password) {
        // Generate password hash 
        const salt = await bcrypt.genSalt(); 
        const passwordHash = await bcrypt.hash(password, salt); 

        user.password = passwordHash;
   }

   if (profileImage) {
     user.profileImage = profileImage
   }

   if (bio) {
    user.bio = bio
   }

   await user.save(); 

   res.status(200).json(user)

}

// Get user by id 

const getUserById = async (req, res) => {
   const { id } = req.params

   try {
     
    const user = await User.findById(id.toString()).select("-password");

    // check if user exist 
   if (!user) {
    res.status(404).json({ erros: ["Usuário nao encontrado."] });
    return
  }

  res.status(200).json(user);

   } catch (error) {
    res.status(404).json({ erros: ["Usuário nao existe."] });
   }
}


module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById
}

