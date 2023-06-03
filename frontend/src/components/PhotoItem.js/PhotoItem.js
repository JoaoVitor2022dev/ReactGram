import "./PhotoItem.css"

// rota de imagens
import { uploads } from "../../utils/config";

// react router
import { Link } from "react-router-dom";

const PhotoItem = ({ photo }) => {
  return (
    <div className="photo-item">
        {photo.image && (
            <img src={`${uploads}/photos/${photo.image}`} alt={photo.title}/>
        )}
        <p>{photo.title}</p>
        <p className="photo-author">
            Publicada por: <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
        </p>
    </div>
  )
}

export default PhotoItem;