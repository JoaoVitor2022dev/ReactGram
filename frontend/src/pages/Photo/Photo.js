import "./Photo.css"

// uploads 
import {uploads} from "../../utils/config"; 

// Message 
import Message from "../../components/Message/Message";

// react router
import { useParams } from "react-router-dom";
import { link } from "react-router-dom";

// hooks 
import { useState, useEffect } from "react"; 

// redux hooks 
import { useSelector, useDispatch } from "react-redux";

// redux 
import { getPhoto, likes } from "../../redux/slices/photoSlice";

// likes
import LikesContainer from "../../components/LikesContainer/LikesContainer";

// photo itens
import PhotoItem from "../../components/PhotoItem.js/PhotoItem";



const Photo = () => {

  const { id } = useParams(); 
  
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth); 
  const { photo , loading, error, message } = useSelector((state) => state.photo)

  // comments 

  // load photo data 
  useEffect(() => {
    dispatch(getPhoto(id)); 
  },[dispatch, id])


    // like function 
    const handleLike = () => {
       dispatch(likes(photo._id))
    };


  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="photo" >
        <PhotoItem photo={photo}/>
        <LikesContainer photo={photo} user={user} handleLike={handleLike}/>
        <div className="message-container">
          {error && <Message msg={error} type="error"/>}
          {message && <Message msg={message} type="sucess"/>}
          {console.log(error, message)}
        </div>
    </div>
  )
}

export default Photo;