import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import MenuPage from './MenuPage';
import ViewMap from './ViewMap';
import UserProfile from './UserProfile';

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



//Import your Get Direction components

import AcadDirection from './AcadDirection';



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



        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
