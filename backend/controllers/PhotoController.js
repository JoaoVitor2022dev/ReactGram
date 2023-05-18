const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

// insert a photo, with an user related to it 
const insertPhoto = async (req, res) => {
   const { title } = req.body; 
   const image = req.file.filename; 

   const reqUser = req.user; 

   const user = await User.findById(reqUser._id); 

   // create a photo 
   const newPhoto = await Photo.create({
     image,
     title,
     userId: user._id, 
     userName: user.name,
    })

    // if photo was created successfully, return data 
    if (!newPhoto) {
        res.status(422).json({errors:["Houve um problema, por favor tente novamente mais tarde."]})
        return 
    }

   res.status(201).json(newPhoto);
}

// remove a photo from DB

const deletePhoto = async(req, res) => {
 
    const { id } = req.params 

    const reqUser = req.user

    try {
        const photo = await Photo.findById(id.toString());  

        //  check exist photo 
        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada!"] })
            return
        }
    
        // check if photo belong to user 
        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({ errors: ["Ocorreu um erro, por favor tente novamente mais tarde."] });  
            return
        }
    
        res.status(200).json({ id: photo._id, message: "Foto excluída com sucesso."}); 
    } catch (error) {
        res.status(404).json({ errors: ["Foto não encontrada! "] }); 
        return; 
    }
}; 

// Get all Photo 

const getAllPhotos = async(req, res) => {
 
    const photos =  await Photo.find({}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos); 
}


// Get user Photos 

const getUserPhotos = async (req, res) => { 
     
    const { id } = req.params; 

    const photos = await Photo.find({ userId: id }).sort([["createdAt", -1 ]]).exec(); 

    res.status(200).json(photos)
}

//  Get photo by id 
const getPhotoById = async (req, res) => {
    const { id } = req.params

    const photo = await Photo.findById(id.toString());  

    // check if photo exists 
    if(!photo){
       res.status(404).json({ errors: ["Foto nao encontrada!"] }); 
       return
    }
    res.status(200).json(photo);
}

// update de photos 


const updatePhoto =  async ( req, res) => {
    const { id } = req.params; 
    const { title } = req.body;
    
    const reqUser = req.user

    const photo = await Photo.findById(id)
    
    // check if photo exist 
    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada"] }); 
        return; 
    }

    // check if photo belong to user 
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({ errors: ["Ocorreu um erro, por favor tente novamente mais tarde. "] });        
      return; 
    }

    if (title) {
        photo.title = title
    }

    // salvar photo 
    await photo.save()

    res.status(200).json({ photo, message: "Foto atualizada com sucesso!" }); 

}

//  like functionalitty

const likePhoto = async(req, res) => {
    const {id} = req.params

    const reqUser = req.user; 

    const photo = await Photo.findById(id); 

    // check if photo exist 
    if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada"] }); 
            return; 
    }

    // check if user alredy liked the photo
    if (photo.likes.includes(reqUser._id)) {
        res.status(422).json({ errors: ["Voce ja curtiu a foto."] });
        return;
    }

    // Put user id in likes array 
    photo.likes.push(reqUser._id)

    photo.save()

    res.status(200).json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida."})

}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
}; 