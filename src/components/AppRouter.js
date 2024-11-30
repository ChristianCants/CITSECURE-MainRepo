import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import components
import Home from './Home';
import VisitorExit from './user/VisitorExit';
import VisitorEntry from './user/VisitorEntry';
import VisitorPhoto from './user/VisitorPhoto';
import MenuPage from './MenuPage';
import AdminPage from './admin/AdminPage';
import VisitorNavigationPage from './Visitor Class/VisitorNavigationPage';
import About from './About';
import AdminLogin from './LoginControl Class/AdminLogin';
import AdminStatistics from './admin/AdminStatistics';

// Import VisitorEntry components
import VisitorEntryFrontGate from './user/VisitorEntryFrontGate';
import VisitorEntryBackGate from './user/VisitorEntryBack';


// Import Front Gate components
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

// Import Back Gate components
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

// Import Office components
import AcadOffices from './Visitor Class/MainOffices/AcadOffices';
import HighSchoolBuildingOffices from './Visitor Class/MainOffices/HighSchoolBuildingOffices';
import ElementaryBuildingOffices from './Visitor Class/MainOffices/ElementaryBuildingOffices';
import GLEBuildingOffices from './Visitor Class/MainOffices/GLEBuildingOffices';
import RTLBuildingOffices from './Visitor Class/MainOffices/RTLBuildingOffices';
import NGEBuildingOffices from './Visitor Class/MainOffices/NGEBuildingOffices';
import LibraryBuildingOffices from './Visitor Class/MainOffices/LibraryBuildingOffices';
import AlliedBuildingOffices from './Visitor Class/MainOffices/AlliedBuildingOffices';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Main Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/VisitorExit" element={<VisitorExit />} />
                <Route path="/VisitorEntry" element={<VisitorEntry />} />
                <Route path="/VisitorPhoto" element={<VisitorPhoto />} />
                <Route path="/admin/adminpage" element={<AdminPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/visitor-navigation" element={<VisitorNavigationPage />} />
                <Route path="/About" element={<About />} />
                <Route path="/AdminLogin" element={<AdminLogin />} />
                <Route path="/admin/AdminStatistics" element={<AdminStatistics />} />

                {/* Visitor Entry Routes */}
                <Route path="/visitorentry/frontgate" element={<VisitorEntryFrontGate />} />
                <Route path="/visitorentry/backgate" element={<VisitorEntryBackGate />} />

                {/* Front Gate Routes */}
                <Route path="/frontgateacadbuilding" element={<FrontgateAcadBuilding />} />
                <Route path="/frontgatehighschool" element={<FrontgateHighSchool />} />
                <Route path="/frontgateelementary" element={<FrontgateElementary />} />
                <Route path="/frontgateglebuilding" element={<FrontgateGLEBuilding />} />
                <Route path="/frontgatemaincanteen" element={<FrontgateMainCanteen />} />
                <Route path="/frontgatertlbuilding" element={<FrontgateRTLBuilding />} />
                <Route path="/frontgatengebuilding" element={<FrontgateNGEBuilding />} />
                <Route path="/frontgatelibrarybuilding" element={<FrontgateLibraryBuilding />} />
                <Route path="/frontgatealliedbuilding" element={<FrontgateAlliedBuilding />} />
                <Route path="/frontgatehighschool-canteen" element={<FrontgateHighSchoolCanteen />} />

                {/* Back Gate Routes */}
                <Route path="/backgateacadbuilding" element={<BackgateAcadBuilding />} />
                <Route path="/backgatehighschool" element={<BackgateHighSchool />} />
                <Route path="/backgateelementary" element={<BackgateElementary />} />
                <Route path="/backgateglebuilding" element={<BackgateGLEBuilding />} />
                <Route path="/backgatemaincanteen" element={<BackgateMainCanteen />} />
                <Route path="/backgatertlbuilding" element={<BackgateRTLBuilding />} />
                <Route path="/backgatengebuilding" element={<BackgateNGEBuilding />} />
                <Route path="/backgatelibrarybuilding" element={<BackgateLibraryBuilding />} />
                <Route path="/backgatealliedbuilding" element={<BackgateAlliedBuilding />} />
                <Route path="/backgatehighschool-canteen" element={<BackgateHighSchoolCanteen />} />

                {/* Office Routes */}
                <Route path="/offices-acad" element={<AcadOffices />} />
                <Route path="/offices-highschool" element={<HighSchoolBuildingOffices />} />
                <Route path="/offices-elementary" element={<ElementaryBuildingOffices />} />
                <Route path="/offices-gle" element={<GLEBuildingOffices />} />
                <Route path="/offices-rtl" element={<RTLBuildingOffices />} />
                <Route path="/offices-nge" element={<NGEBuildingOffices />} />
                <Route path="/offices-library" element={<LibraryBuildingOffices />} />
                <Route path="/offices-allied" element={<AlliedBuildingOffices />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
