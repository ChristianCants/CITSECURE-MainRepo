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

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/view-map" element={<ViewMap />} />

        {/* Routes for specific buildings */}
        <Route path="/building/high-school-canteen" element={<HighSchoolCanteen />} />
        <Route path="/building/allied-building" element={<AlliedBuilding />} />
        <Route path="/building/library-building" element={<LibraryBuilding />} />
        <Route path="/building/nge-building" element={<NGEBuilding />} />
        <Route path="/building/rtl-building" element={<RTLBuilding />} />
        <Route path="/building/elementary-building" element={<ElementaryBuilding />} />
        <Route path="/building/academic-building" element={<AcademicBuilding />} />
        <Route path="/building/high-school-building" element={<HighSchoolBuilding />} />
        <Route path="/building/gle-building" element={<GLEBuilding />} />
        <Route path="/building/main-canteen" element={<MainCanteen />} />

        {/* Add more routes for other components as needed */}

        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
