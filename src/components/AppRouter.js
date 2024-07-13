import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import VisitorExit from './user/VisitorExit';
import VisitorEntry from './user/VisitorEntry';
import VisitorPhoto from './user/VisitorPhoto'; // Add this import
import MenuPage from './MenuPage';
import AdminPage from './admin/AdminPage';
import VisitorNavigationPage from './Visitor Class/VisitorNavigationPage';
import About from './About';
import AdminLogin from './LoginControl Class/AdminLogin';
import AcadBuilding from './Visitor Class/AcadBuilding';
import HighSchool from './Visitor Class/HighSchool';
import Elementary from './Visitor Class/Elementary';
import GLEBuilding from './Visitor Class/GLEBuilding';
import MainCanteen from './Visitor Class/MainCanteen';
import RTLBuilding from './Visitor Class/RTLBuilding';
import NGEBuilding from './Visitor Class/NGEBuilding';
import LibraryBuilding from './Visitor Class/LibraryBuilding';
import AlliedBuilding from './Visitor Class/AlliedBuilding';
import HighSchoolCanteen from './Visitor Class/HighSchoolCanteen';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/VisitorExit" element={<VisitorExit />} />
                <Route path="/VisitorEntry" element={<VisitorEntry />} />
                <Route path="/VisitorPhoto" element={<VisitorPhoto />} /> {/* Add this line */}
                <Route path="/admin/adminpage" element={<AdminPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/visitor-navigation" element={<VisitorNavigationPage />} />
                <Route path="/About" element={<About />} />
                <Route path="/AdminLogin" element={<AdminLogin />} />
                <Route path="/acadbuilding" element={<AcadBuilding />} />
                <Route path="/highschool" element={<HighSchool />} /> 
                <Route path="/elementary" element={<Elementary />} /> 
                <Route path="/glebuilding" element={<GLEBuilding />} />
                <Route path="/maincanteen" element={<MainCanteen />} />
                <Route path="/rtlbuilding" element={<RTLBuilding/>} />
                <Route path="/ngebuilding" element={<NGEBuilding/>} />
                <Route path="/librarybuilding" element={<LibraryBuilding/>} />
                <Route path="/alliedbuilding" element={<AlliedBuilding/>} />
                <Route path="/high-schoolcanteen" element={<HighSchoolCanteen/>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
