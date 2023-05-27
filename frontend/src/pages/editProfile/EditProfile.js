// styles 
import "./EditProfile.css";

// components redux 

// receber imagens
import { uploads } from "../../utils/config";

// hooks 
import { useState, useEffect } from "react";

// hooks redux
import { useSelector, useDispatch } from "react-redux";

// redux slice 
import { profile, resetMessage } from "../../redux/slices/userSlice";

// message
import Message from "../../components/Message/Message";

const EditProfile = () => {

     const dispatch = useDispatch()
     
     const { user, message, error, loading } = useSelector((state) => state.user);

     // states 
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [profileImage, setProfileImage] = useState("");
     const [bio, setBio] = useState("");
     const [previewImage, setPreviewImage] = useState("");

    // load user data
    useEffect(() => {
      dispatch(profile());
    },[dispatch]); 

    // fill form with user data

     useEffect(() => {
        if (user) {
          setName(user.name);
          setEmail(user.email);
          setBio(user.bio);
        }
     },[user]); 
    
    const handleSubmit = (e) => {
      e.preventDefault();
    }; 
     
  return (
    <div id="edit-profile">
        <h2>Edite seus dados</h2>
        <p className="subtitle">Adicione imagem de perfil e conte mais sobre voce...</p>
        {/* Preview da imagem*/}
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""}/>
            <input type="email" placeholder="E-mail" disabled value={email || ""} />
            <label>
                <span>Imagem do perfil:</span>
                <input type="file" />
            </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" 
                    placeholder="Descriçao do perfil" 
                    onChange={(e) => setBio(e.target.value)} 
                    value={bio || ""} />
                </label>
                <label>
                    <span>Quer alterar sua senha ?</span>
                    <input type="password"
                    placeholder="Digite sua nova senha"
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password || ""} />
                </label>
                <input type="submit" value="Enviar" />
        </form>
    </div>
  );
};

export default EditProfile
