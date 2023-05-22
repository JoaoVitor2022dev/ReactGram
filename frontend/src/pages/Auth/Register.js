// styles 
import "./Auth.css"

// routers
import { Link } from "react-router-dom"

// hook 
import { useState, useEffect } from "react"


const Register = () => {
 
  // function de envio 
  const handleSubmit = (event) => {
    event.preventDefault();
  }; 

  return (
    <div id="register">
       <h2>ReactGram</h2>
       <p className="subtitle">Cadastre-se para ve as fotos dos seus amigos</p>
       <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome"/>
          <input type="email" placeholder="E-mail"/>
          <input type="password" placeholder="Senha"/>
          <input type="password" placeholder="Confirme sua senha"/>
          <input type="submit" value="Cadastrar"/>
       </form>
       <p>
        Já tem conta ? <Link to="/login">Clique aqui.</Link>
       </p>
    </div>
  )
}

export default Register