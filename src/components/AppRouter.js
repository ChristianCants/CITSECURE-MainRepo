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

import FrontgateAcadBuilding from './Visitor Class/FrontgateAcadBuilding';
import FrontgateHighSchool from './Visitor Class/FrontgateHighSchool';
import FrontgateElementary from './Visitor Class/FrontgateElementary';
import FrontgateGLEBuilding from './Visitor Class/FrontgateGLEBuilding';
import FrontgateMainCanteen from './Visitor Class/FrontgateMainCanteen';
import FrontgateRTLBuilding from './Visitor Class/FrontgateRTLBuilding';
import FrontgateNGEBuilding from './Visitor Class/FrontgateNGEBuilding';
import FrontgateLibraryBuilding from './Visitor Class/FrontgateLibraryBuilding';
import FrontgateAlliedBuilding from './Visitor Class/FrontgateAlliedBuilding';
import FrontgateHighSchoolCanteen from './Visitor Class/FrontgateHighSchoolCanteen';

import BackgateAcadBuilding from './Visitor Class/BackgateAcadBuilding';
import BackgateHighSchool from './Visitor Class/BackgateHighSchool';
import BackgateElementary from './Visitor Class/BackgateElementary';
import BackgateGLEBuilding from './Visitor Class/BackGLEBuilding';
import BackgateMainCanteen from './Visitor Class/BackgateMainCanteen';
import BackgateRTLBuilding from './Visitor Class/BackgateRTLBuilding';
import BackgateNGEBuilding from './Visitor Class/BackgateNGEBuilding';
import BackgateLibraryBuilding from './Visitor Class/BackgateLibraryBuilding';
import BackgateAlliedBuilding from './Visitor Class/BackgateAlliedBuilding';
import BackgateHighSchoolCanteen from './Visitor Class/BackgateHighSchoolCanteen';




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

                
                {/* Frontgate Navigation for All buildingToVisit */}
                <Route path="/frontgateacadbuilding" element={<FrontgateAcadBuilding />} />
                <Route path="/frontgatehighschool" element={<FrontgateHighSchool />} /> 
                <Route path="/frontgateelementary" element={<FrontgateElementary/>} /> 
                <Route path="/frontgateglebuilding" element={<FrontgateGLEBuilding />} />
                <Route path="/frontgatemaincanteen" element={<FrontgateMainCanteen />} />
                <Route path="/frontgatertlbuilding" element={<FrontgateRTLBuilding/>} />
                <Route path="/frontgatengebuilding" element={<FrontgateNGEBuilding/>} />
                <Route path="/frontgatelibrarybuilding" element={<FrontgateLibraryBuilding/>} />
                <Route path="/frontgatealliedbuilding" element={<FrontgateAlliedBuilding/>} />
                <Route path="/frontgatehigh-schoolcanteen" element={<FrontgateHighSchoolCanteen/>} />

                
                {/* Backgate navigation for All buildingToVisit */}

                <Route path="/backgateacadbuilding" element={<BackgateAcadBuilding />} />
                <Route path="/backgatehighschool" element={<BackgateHighSchool />} /> 
                <Route path="/backgateelementary" element={<BackgateElementary />} /> 
                <Route path="/Backgateglebuilding" element={<BackgateGLEBuilding />} />
                <Route path="/backgatemaincanteen" element={<BackgateMainCanteen />} />
                <Route path="/backgatertlbuilding" element={<BackgateRTLBuilding/>} />
                <Route path="/Backgatengebuilding" element={<BackgateNGEBuilding/>} />
                <Route path="/Backgatelibrarybuilding" element={<BackgateLibraryBuilding/>} />
                <Route path="/Backgatealliedbuilding" element={<BackgateAlliedBuilding/>} />
                <Route path="/Backgatehigh-schoolcanteen" element={<BackgateHighSchoolCanteen/>} />

            </Routes>
        </Router>
    );
};

export default AppRouter;
