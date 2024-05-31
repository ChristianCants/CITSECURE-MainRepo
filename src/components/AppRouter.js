import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import VisitorExit from './user/VisitorExit';
import VisitorEntry from './user/VisitorEntry';
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
                <Route path="/admin/adminpage" element={<AdminPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/visitor-navigation" element={<VisitorNavigationPage />} />
                <Route path="/About" element={<About />} />
                <Route path="/AdminLogin" element={<AdminLogin />} />
                <Route path="/acad-building" element={<AcadBuilding />} />
                <Route path="/high-school" element={<HighSchool />} /> 
                <Route path="/elementary" element={<Elementary />} /> 
                <Route path="/gle-building" element={<GLEBuilding />} />
                <Route path="/main-canteen" element={<MainCanteen />} />
                <Route path="/rtl-building" element={<RTLBuilding/>} />
                <Route path="/nge-building" element={<NGEBuilding/>} />
                <Route path="/library-building" element={<LibraryBuilding/>} />
                <Route path="/allied-building" element={<AlliedBuilding/>} />
                <Route path="/high-school-canteen" element={<HighSchoolCanteen/>} />

            </Routes>
        </Router>
    );
};

export default AppRouter;
