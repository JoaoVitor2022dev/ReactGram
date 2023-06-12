const mongoose = require("mongoose");
const dbUser = process.env.BD_USER;
const dbPassword = process.env.DB_PASSWORD; 

const conn = async() => { 
    try {
        const dbConn = await mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@instareact.jju5bid.mongodb.net/`
        ); 
        console.log("Conectou ao banco!");

        return dbConn;
    } catch (err) {  
        console.log(err);
    }
};

conn();

module.exports = conn;

