import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from 'react';
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api"
function App() {
  const [user,setUser] = useState(null);
  const getUser = async() => {  // token을 통해 user 정보를 가져온다.
    try {
      const storedToken = sessionStorage.getItem('token');
      if(storedToken) {
        const response = await api.get('/user/me')
        console.log('re',response)
        setUser(response.data.user)
      }
    }catch(error){
      setUser(null)
    }
  }
  
  useEffect(() => {
    getUser()
  },[])
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      <Route 
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage />
          </PrivateRoute>
        } 
      />
      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
      <Route path="/register" element={<RegisterPage />} />

    </Routes>
  );
}

export default App;