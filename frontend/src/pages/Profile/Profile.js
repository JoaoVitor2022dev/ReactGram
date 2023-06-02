// styles
import "./Profile.css";

// uploads 
import { uploads } from "../../utils/config";

// Messagens 
import Message from "../../components/Message/Message";

// react router 
import { Link, useParams } from "react-router-dom"; 

// icons 
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// hook  
import { useState, useEffect, useRef } from "react"; 

// redux hooks
import { useSelector, useDispatch } from "react-redux"

// redux 
import { getUserDetails } from "../../redux/slices/userSlice";
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from "../../redux/slices/photoSlice";

const Profile = () => {
 
  const { id } = useParams(); 

  const dispatch = useDispatch(); 

  // user another perfil
  const { user, loading } = useSelector((state) => state.user); 

  // user auhtntication 
  const { user: userAuth } = useSelector((state) => state.auth);

  // photos 
  const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo);  

  // state de incluir dados
  const [title, setTitle] = useState(""); 
  const [image, setImage] = useState("");

  // states do editphotos - para ediçao
  const [editId, setEditId] = useState(""); 
  const [editImage, setEditImage] = useState(""); 
  const [editTitle, setEditTitle] = useState(""); 


  // new form and form refd 
  const newPhotoForm = useRef(); 
  const editPhotoForm = useRef();
  

  // loading user data 
  useEffect(() => {
  dispatch(getUserDetails(id));   
  dispatch(getUserPhotos(id));
  },[dispatch, id]); 
 

  // send photos data
  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0]; 
    // update image state 
    setImage(image);
  };

  // send body data   
  const submitHandle = (e) => {
    e.preventDefault(); 

   const photoData = {
    title,
    image
   } 

   // build form data

   const formData = new FormData();

   const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));

   formData.append("photo", photoFormData)

   dispatch(publishPhoto(formData));

   setTitle("");

   setTimeout(() => {
      dispatch(resetMessage());
   }, 2000);

  }

 
  const reseteComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
   }, 2000);
  }

  // Delete a photo
   
  const handleDelete = (id) => {
    dispatch(deletePhoto(id))

    reseteComponentMessage(); 
  };

  // show or hide forms 
  const hideOrShowForms = () => {
       newPhotoForm.current.classList.toggle("hide");
       editPhotoForm.current.classList.toggle("hide");
  };

  // Update a photo 

  const handleUpdate = (e) => {
    e.preventDefault(); 
 
    const photoData = {
       title: editTitle,
       id: editId
    }

    console.log(photoData);

    dispatch(updatePhoto(photoData));

    reseteComponentMessage();
}

  // Open edit form
  const handleEdit = (photo) => {
      if (editPhotoForm.current.classList.contains("hide")) {
        hideOrShowForms()
      }

      setEditId(photo._id);
      setEditImage(photo.title);
      setEditImage(photo.image); 
  }

  const handleCancelEdit = (e) => {
    hideOrShowForms();
  };


  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
    <div id="profile">
        <div className="profile-header">
            {user.profileImage && (
               <img src={`${uploads}/users/${user.profileImage}`} alt={user.name}/>
            )}
            <div className="profile-description">
              <h2>{user.name}</h2>
              <p>{user.bio}</p>
            </div>
        </div>
        {id === userAuth._id && (
          <>
             <div className="new-photo" ref={newPhotoForm}>
                 <h3>Compartilhando algum momento seu:</h3>
                 <form onSubmit={submitHandle}>
                     <label>
                         <span>Título para a foto:</span>
                         <input type="text" placeholder="Insira um título" onChange={(e) => setTitle(e.target.value)} />
                     </label>
                     <label>
                         <span>Imagem:</span>
                         <input type="file" onChange={handleFile} />
                     </label>
                     {!loadingPhoto && <input type="submit" value="Postar"/> }
                     {loadingPhoto && <input type="submit" disabled value="Aguarde..."/>}
                 </form>
             </div>
             <div className="edit-photo hide" ref={editPhotoForm}>
                  <p>Editando:</p>
                  {editImage && (
                    <img src={`${uploads}/photos/${editImage}`} alt={editTitle}/>
                  )}
                  <form onSubmit={handleUpdate}>
                     <input type="text" 
                     placeholder="Insira um novo titulo"
                     onChange={(e) => setEditTitle(e.target.value)} 
                     />
                  <input type="submit" value="Atualizar"/>
                  <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar ediçao</button>
                  </form>                 
             </div>
             {errorPhoto && <Message msg={errorPhoto} type="error"/>}
             {messagePhoto && <Message msg={messagePhoto} type="sucess"/>}
          </>
        )}
        <div className="user-photos">
          <h2>Fotos publicadas:</h2>
            <div className="photos-container">
              {photos && photos.map((photo) => (
                 <div className="photo" key={photo._id}>
                     {photo.image && (<img src={`${uploads}/photos/${photo.image}`} alt={photo.title}/>)}
                     {id === userAuth._id ? 
                     <div className="action">
                         <Link to={`/photos/${photo._id}`}>
                          <BsFillEyeFill/>
                         </Link>
                         <BsPencilFill onClick={() => handleEdit(photo)}/>
                         <BsXLg onClick={() => handleDelete(photo._id)}/>
                     </div> 
                     : <Link className="btn" to={`/photos/${photo._id}`}>Ver</Link>}
                 </div>
              ))}
            {photos.length === 0 && (
              <p>ainda não há fotos publicadas</p>
            )}
            </div>
        </div>
    </div>
    </>
  )
}

export default Profile
