// styles
import "./Profile.css";

// uploads 
import { uploads } from "../../utils/config";

// Messagens 
import Message from "../../components/Message/Message";

// react router 
import { link, useParams } from "react-router-dom"; 

// icons 
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// hook  
import { useState, useEffect, useRef } from "react"; 

// redux hooks
import { useSelector, useDispatch } from "react-redux"

// redux 
import { getUserDetails } from "../../redux/slices/userSlice";


const Profile = () => {
 
  const { id } = useParams(); 

  const dispatch = useDispatch(); 

  // user another perfil
  const { user, loading } = useSelector((state) => state.user); 

  // user auhtntication 
  const { user: userAuth } = useSelector((state) => state.auth);

  // new form and form refd 
  const newPhotoForm = useRef(); 
  const editPhotoForm = useRef();
  

  // loading user data 
  useEffect(() => {
  dispatch(getUserDetails(id));   
  },[dispatch, id]); 
 
  
  const submitHandle = (e) => {
    e.preventDefault(); 
  }


  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
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
                         <input type="text" placeholder="Insira um Título" />
                     </label>
                     <label>
                         <span>Imagem:</span>
                         <input type="file" />
                     </label>
                     <input type="submit" value="Postar"/>
                 </form>
             </div>
          </>
        )}
    </div>
  )
}

export default Profile