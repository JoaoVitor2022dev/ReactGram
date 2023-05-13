const multer = require('multer'); 
const path = require("path");

// Destination to store image 
const imageStore = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = ""

        if (req.baseUrl.includes("users")) {
            folder = "users"
        } else if(req.baseUrl.includes("photos")){
            folder = "photos"
        }

        // destino da imagen
        cb(null, `uploads/${folder}/`);
    },
    fileName: (req, file, cb) => {
      // mudar o nome do arquivo 
      cb(null, Date.now() + path.extname(file.originalname))
   }
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
             // upload only png and jpg formats 
             
             return cb(new Error("Por favor, apenas envie png ou jpeg ou jpg!"))
        }
        cb(undefined, true);
    }
})

module.exports = {  imageUpload };