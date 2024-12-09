import { useState } from "react";
import "./App.css";
import Login from "./Pages/Login";

import MainPage from "./Pages/MainPage";
import SignUp from "./Pages/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import RefreshHandeler from "./Pages/RefreshHandler";

function App() {
  const [isauthenticated,setIsauthenticated]=useState()
  const PrivateRoute=({element})=>{
    return isauthenticated?element:<Navigate to="/"/>
  }
  return (
    <div className="App">
    <RefreshHandeler setIsauthenticated={setIsauthenticated} />
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/mainPage' element={<PrivateRoute element={<MainPage/>}/>} />
    </Routes>
  </div>
  );
}

export default App;
