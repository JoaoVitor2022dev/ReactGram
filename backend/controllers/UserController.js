const User = require("../models/User");

const bcrypt = require("bcryptjs"); 
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

const login = async (req, res) => { 
    
    const { email, password } = req.body; 

    const user = await User.findOne({ email });

    // check if user exist
    if (!user) {
        res.status(422).json({ errors: ["Usuário não encontrado."] })
        return
    }

    // check if password matches
    if (!bcrypt.compare(password, user.password)) {
        res.status(422).json({ erros: ["Senha inválida."]})
        return
    }

    // return user with token 
    res.status(201).json({ 
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    }) 
}; 


//  get current logged in user 

const getCurrentUser = async (req, res) => {  
    
  const user = req.user; 
  
  res.status(200).json(user);
}; 


module.exports = {
    register,
    login,
    getCurrentUser
}

