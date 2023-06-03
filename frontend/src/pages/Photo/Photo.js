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
import { getPhoto } from "../../redux/slices/photoSlice";

// photo itens
import PhotoItem from "../../components/PhotoItem.js/PhotoItem";

const Photo = () => {

  const { id } = useParams(); 
  
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth); 
  const { photo,loading, error, message } = useSelector((state) => state.photo)

  // comments 

  // load photo data 
  useEffect(() => {
    dispatch(getPhoto(id)); 
  },[dispatch, id])


  // like e comentario


  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="photo" >
        <PhotoItem photo={photo}/>
    </div>
  )
}

export default Photo;