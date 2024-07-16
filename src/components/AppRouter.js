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
