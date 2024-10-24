import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from 'react';
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api"
import Header from "./components/Header";

function App() {
  const [user,setUser] = useState(null);
  const navigate = useNavigate();
  const getUser = async() => {  // token을 통해 user 정보를 가져온다.
    try {
      const storedToken = sessionStorage.getItem('token');
      if(storedToken) {
        const response = await api.get('/user/me')
        setUser(response.data.user)
      }
    }catch(error){
      setUser(null)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    getUser()
  },[])
  return (
    <>
      <Header user={user} handleLogout={handleLogout}/>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route 
          path="/"
          element={
            <PrivateRoute user={user}>
              <TodoPage/>
            </PrivateRoute>
          } 
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />

      </Routes>
    </>
  );
}

export default App;