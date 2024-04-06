import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import VisitorOut from './VisitorOut'; // Import the VisitorOut component
import SignUp from './SignUp';
import MenuPage from './MenuPage';
import ViewMap from './ViewMap';
import UserProfile from './UserProfile';
import AdminPage from './AdminPage'; // Import the AdminPage component

// Import your building components
import HighSchoolCanteen from './HighSchoolCanteen';
import AlliedBuilding from './AlliedBuilding';
import LibraryBuilding from './LibraryBuilding';
import NGEBuilding from './NGEBuilding';
import RTLBuilding from './RTLBuilding';
import ElementaryBuilding from './ElementaryBuilding';
import AcademicBuilding from './AcademicBuilding'; 
import HighSchoolBuilding from './HighSchoolBuilding';
import GLEBuilding from './GLEBuilding';
import MainCanteen from './MainCanteen';
import Building from './Building';

// Import your Get Direction components
import AcadDirection from './AcadDirection';
import AlliedDirection from './AlliedDirection';
import LibraryDirection from './LibraryDirection';
import NGEDirection from './NGEDirection';
import RTLDirection from './RTLDirection';
import ElementaryDirection from './ElementaryDirection';
import HSDirection from './HSDirection';
import GLEDirection from './GLEDirection';
import MainCanteenDirection from './MainCanteenDirection';
import HSCanteenDirection from './HSCanteenDirection';

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
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/view-map" element={<ViewMap />} />
        <Route path="/building" element={<Building />} />

          {/* Routes for specific buildings */}
          <Route path="/view-map/high-school-canteen" element={<HighSchoolCanteen />} />
        <Route path="/view-map/allied-building" element={<AlliedBuilding />} />
        <Route path="/view-map/library-building" element={<LibraryBuilding />} />
        <Route path="/view-map/nge-building" element={<NGEBuilding />} />
        <Route path="/view-map/rtl-building" element={<RTLBuilding />} />
        <Route path="/view-map/elementary-building" element={<ElementaryBuilding />} />
        <Route path="/view-map/academic-building" element={<AcademicBuilding />} />
        <Route path="/view-map/high-school-building" element={<HighSchoolBuilding />} />
        <Route path="/view-map/gle-building" element={<GLEBuilding />} />
        <Route path="/view-map/main-canteen" element={<MainCanteen />} />

        {/* Add more routes for other components as needed */}

      {/* Add the route for AcadDirection component */}
      <Route path="/view-map/academic-direction" element={<AcadDirection />} />
      <Route path="/view-map/allied-direction" element={<AlliedDirection />} />
      <Route path="/view-map/library-direction" element={<LibraryDirection />} />
      <Route path="/view-map/nge-direction" element={<NGEDirection />} />
      <Route path="/view-map/rtl-direction" element={<RTLDirection />} />
      <Route path="/view-map/elementary-direction" element={<ElementaryDirection />} />
      <Route path="/view-map/hs-direction" element={<HSDirection />} />
      <Route path="/view-map/gle-direction" element={<GLEDirection />} />
      <Route path="/view-map/main-canteen-direction" element={<MainCanteenDirection />} />
      <Route path="/view-map/hs-canteen-direction" element={<HSCanteenDirection />} />

        {userRole === 'Admin' && (
          <Route path="/admin" element={<AdminPage />} />
        )}

        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
