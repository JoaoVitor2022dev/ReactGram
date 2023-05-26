// styles 
import "./Auth.css"

// routers
import { Link } from "react-router-dom"

// hook 
import { useState, useEffect } from "react"

// redux 
import { register, reset } from "../../redux/slices/authSlice"
import { useSelector, useDispatch } from "react-redux"

// Message 
import Message from "../../components/Message/Message";

const Register = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 

  // contexto do redux 
  const dispatch = useDispatch(); 

  const { loading, error } = useSelector((state) => state.auth);
 
  // function de envio 
  const handleSubmit = (event) => {
    event.preventDefault();
 
    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    dispatch(register(user)); 
  }; 

  // clear (error,data,loading) for a new request / clean all states 
  useEffect(() => {
   dispatch(reset());
  },[dispatch])

  return (
    <div id="register">
       <h2>ReactGram</h2>
       <p className="subtitle">Cadastre-se para ve as fotos dos seus amigos</p>
       <form onSubmit={handleSubmit}>
          <input type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)} 
          value={name || ''}
          />
          <input type="email" 
          placeholder="E-mail"  
          onChange={(e) => setEmail(e.target.value)} 
          value={email || ''}
          />
          <input type="password" 
          placeholder="Senha"  
          onChange={(e) => setPassword(e.target.value)} 
          value={password || ''}
          />
          <input type="password" 
          placeholder="Confirme sua senha"  
          onChange={(e) => setConfirmPassword(e.target.value)} 
          value={confirmPassword || ''}
          />
          {!loading && <input type="submit" value="Cadastrar"/>}
          {loading &&  <input type="submit" value="Aguarde..." disabled/>}
          {error && <Message msg={error} type="error"/>}
       </form>
       <p>
        Já tem conta ? <Link to="/login">Clique aqui.</Link>
       </p>
    </div>
  )
}

export default Register