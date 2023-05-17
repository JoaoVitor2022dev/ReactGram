const express = require('express'); 
const router = express.Router();

// controller 
const { insertPhoto, deletePhoto, getAllPhotos } = require("../controllers/PhotoController");

// middleware 
const { photoInsertValidation } = require("../middlewares/photoValidations"); 
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");

// router
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto); 
router.delete("/:id", authGuard, deletePhoto ); 
router.get("/", authGuard, getAllPhotos)

module.exports = router; 