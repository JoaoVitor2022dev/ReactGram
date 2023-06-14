import "./LikesContainer.css"

// incos 
import { BsHeart, BsHeartFill } from "react-icons/bs"; 

const LikesContainer = ({ photo, user, handleLike }) => {
  return (
     <div className="like">
        {photo.like && user && (
            <>
               {photo.likes.includes(user._id) ? (
                 <BsHeartFill/>
               ):(
                 <BsHeart onClick={() => handleLike(photo)}/>
               )}
               <p>{photo.likes.length} Like(s)</p>
            </>
        )}
     </div>
  )
}

export default LikesContainer;