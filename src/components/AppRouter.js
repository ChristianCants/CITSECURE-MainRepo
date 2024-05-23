import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import VisitorOut from './user/VisitorOut';  
import SignUp from './user/SignUp';
import MenuPage from './MenuPage';
import AdminPage from './admin/AdminPage'; 
import VisitorNavigationPage from './Visitor Class/VisitorNavigationPage';  // Corrected Path
import About from './About'; 
import AdminLogin from './LoginControl Class/AdminLogin'; 

const AppRouter = () => {
  
  
  return (      
    <Router>
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/VisitorOut" element={<VisitorOut />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/adminpage" element={<AdminPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/visitor-navigation" element={<VisitorNavigationPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
