import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import MenuPage from './MenuPage';
import ViewMap from './ViewMap';
import Building from './Building';
import UserProfile from './UserProfile';
 
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/view-map" element={<ViewMap />} />
        <Route path="/building" element={<Building />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;