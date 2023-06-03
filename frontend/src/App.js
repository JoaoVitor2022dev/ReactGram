// react router dom 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

// styles de app
import './App.css';

// hook de authentication 
import { useAuth } from "./hooks/useAuth";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditProfile from "./pages/editProfile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Photo from "./pages/Photo/Photo";

// Componentes
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
 
  const { auth, loading } = useAuth(); 

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
       <BrowserRouter>
        <Navbar/>
         <div className="container">
            <Routes>
              <Route path="/" element={auth ? <Home/> : <Navigate to="/login"/>}/>
              <Route  path="/profile" element={auth ? <EditProfile/> :<Navigate to="/login"/>} />
              <Route  path="/users/:id" element={auth ? <Profile/> :<Navigate to="/login"/>} />
              <Route path="/login" element={!auth ? <Login/> : <Navigate to="/"/>}/>
              <Route path="/register" element={!auth ? <Register/> : <Navigate to="/"/>}/>
              <Route  path="/photos/:id" element={auth ? <Photo/> :<Navigate to="/login"/>} />
            </Routes>
         </div>
         <Footer/>
       </BrowserRouter>
    </div>
  );
}

export default App;
