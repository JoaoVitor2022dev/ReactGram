import "./Home.css"

// componentes 
import LikesContainer from "../../components/LikesContainer/LikesContainer"; 
import PhotoItem from "../../components/PhotoItem.js/PhotoItem"; 

// react router 
import { Link } from "react-router-dom";

// hooks 
import { useEffect } from "react";

// hooks redux 
import { useSelector, useDispatch } from "react-redux"

// reset message 
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// redux 
import { getPhotos, likes } from "../../redux/slices/photoSlice"

const Home = () => {
  
  const dispatch = useDispatch(); 

  const resetMessage = useResetComponentMessage(); 

  const { user } = useSelector((state) => state.auth)
  const { photos, loading } = useSelector((state) => state.photo) 

  // Load all Photos 
   
  useEffect(() => {
    dispatch(getPhotos())
  },[dispatch])

  // Like a photo 
  const handleLike = () => {
    dispatch(likes(photos._id))

    resetMessage()
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="Home">
       {photos && photos.map((photo) => (<div key={photo._id}>
        <PhotoItem photo={photo}/>
        <LikesContainer photo={photo} user={user} handleLike={handleLike}/>
        <Link className="btn" to={`/photos/${photos._id}`}>Ver mais</Link>
       </div>))} 
       {photos && photos.length === 0 && (
          <h2 className="no_photos">
              Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>click aqui</Link>
          </h2>
       )}
    </div>
  )
}

export default Home;