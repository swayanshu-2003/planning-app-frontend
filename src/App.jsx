import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import Login from './components/login/Login';
import Home from './components/home/Home';
import TodoDetails from './pages/TodoDetails';
import axiosInstance from './utils/axiosInstance';
import StickyPlusButton from './components/misc/StickyPlusButton';
import InvitePage from './components/invite/InvitePage';
import NotFound from './components/404/NotFound';
import LandingPage from './components/landingpage/LandingPage';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      if (!sessionStorage.getItem('token')) {
        setUser(null);
        return;
      }
      const user = await axiosInstance.get('/user');
      try {

        if (user?.data?.success) {
          setUser(user?.data?.user);
        }
        else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    }
    getUserData();
  }, [refetch]);





  return (
    <div className="w-full">
      <NavBar user={user} setRefetch={setRefetch} refetch={refetch} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home refetch={refetch} />} />
        <Route path="/auth/login" element={<Login refetch={setRefetch} />} />
        <Route path="/todo/:uuid" element={<TodoDetails user={user} setRefetch={setRefetch} refetch={refetch} />} />
        <Route path="/todo/invite/:uuid" element={<InvitePage />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
      {user !== null && <StickyPlusButton setRefetch={setRefetch} />}
    </div>
  );
};

export default App;
