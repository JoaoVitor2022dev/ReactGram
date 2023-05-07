const { validationResult } = require('express-validator');

const validate = (req, res, next ) => { 
 
   // erros  
    const errors = validationResult(req); 
 
   // check erros in validationResult 
   if (errors.isEmpty()) {
      return next();
   } 

   // array de erros 
   const extractedErros = []; 

   // config para juntar os array 
   errors.array().map((err) =>  extractedErros.push(err.msg));

   // respota 
   return res.status(422).json({ errors: extractedErros })
}; 

module.exports = validate