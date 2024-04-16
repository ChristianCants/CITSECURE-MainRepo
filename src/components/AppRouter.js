import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import VisitorOut from './VisitorOut'; // Import the VisitorOut component
import SignUp from './SignUp';
import SignUpp from './SignUpp';
import MenuPage from './MenuPage';
import ViewMap from './ViewMap';
import UserProfile from './UserProfile';
import AdminPage from './AdminPage'; // Import the AdminPage component
import VisitorNavigationPage from './VisitorNavigationPage';
import About from './About'; 


const AppRouter = () => {
  // Assume you have a function to get the user role, you can replace this with your actual logic
  const getUserRole = () => {
    // Replace this with your actual logic to get the user role
    // For example, you might get it from the authentication token or API response
    return 'Admin'; // Replace 'admin' with the actual user role
  };
  
  const userRole = getUserRole();
  console.log('User Role:', userRole); // Log the user role to the console
  
  return (      
    <Router>
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/VisitorOut" element={<VisitorOut />} /> {/* Use VisitorOut component here */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupp" element={<SignUpp />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/view-map" element={<ViewMap />} />
        <Route path="/visitor-navigation" element={<VisitorNavigationPage />} />
        <Route path="/About" element={<About />} />

        
        

          

        {/* Add more routes for other components as needed */}

      

        {userRole === 'Admin' && (
          <Route path="/admin" element={<AdminPage />} />
        )}

        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
