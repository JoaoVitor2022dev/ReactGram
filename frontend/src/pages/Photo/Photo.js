import "./Photo.css"

// uploads 
import {uploads} from "../../utils/config"; 

// Message 
import Message from "../../components/Message/Message";

// react router
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// hooks 
import { useState, useEffect } from "react"; 

// redux hooks 
import { useSelector, useDispatch } from "react-redux";

// redux 
import { getPhoto, likes, coments } from "../../redux/slices/photoSlice";

// likes
import LikesContainer from "../../components/LikesContainer/LikesContainer";

// photo itens
import PhotoItem from "../../components/PhotoItem.js/PhotoItem";



const Photo = () => {

  const { id } = useParams(); 
  
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth); 
  const { photo , loading, error, message } = useSelector((state) => state.photo); 

  // comments 
  const [commentText, setCommentText ] = useState("");

  // send data comment 
  
  const handleSubmit = (e) => {
    e.preventDefault()
  }


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
        </div>
        <div className="comments">
          {photo.comments && (
            <>
              <h3> Comentarios ({ photo.comments.length}):</h3>
              <form onSubmit={handleSubmit}>
                 <input type="text"
                 placeholder="Insira seu comentário..."
                 onChange={(e) => setCommentText(e.target.value)} 
                 value={commentText || ""}
                 />
               <input type="submit" value="Enviar" />
              </form>
              {photo.comments.length === 0 && <p>Não há comentários...</p>}    
              {photo.comments.map((comment) =>( 
                <div className="comments" key={comment.comment}>
                     <div className="author">
                        {photo.image && (
                           <img src={`${uploads}/users/${comment.userImage}`}/> 
                        )}
                         <Link to={`/users/${comment.userId}`}>
                            <p>{comment.userName}</p>
                         </Link>
                        <p>{comment.comment}</p>
                     </div>
                </div>
              )
              )}
            </>            
          )}
        </div>
    </div>
  )
}

export default Photo;