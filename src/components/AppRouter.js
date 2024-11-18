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
                <Route path="/frontgate/acadbuilding" element={<FrontgateAcadBuilding />} />
                <Route path="/frontgate/highschool" element={<FrontgateHighSchool />} />
                <Route path="/frontgate/elementary" element={<FrontgateElementary />} />
                <Route path="/frontgate/glebuilding" element={<FrontgateGLEBuilding />} />
                <Route path="/frontgate/maincanteen" element={<FrontgateMainCanteen />} />
                <Route path="/frontgate/rtlbuilding" element={<FrontgateRTLBuilding />} />
                <Route path="/frontgate/ngebuilding" element={<FrontgateNGEBuilding />} />
                <Route path="/frontgate/librarybuilding" element={<FrontgateLibraryBuilding />} />
                <Route path="/frontgate/alliedbuilding" element={<FrontgateAlliedBuilding />} />
                <Route path="/frontgate/highschool-canteen" element={<FrontgateHighSchoolCanteen />} />

                {/* Back Gate Routes */}
                <Route path="/backgate/acadbuilding" element={<BackgateAcadBuilding />} />
                <Route path="/backgate/highschool" element={<BackgateHighSchool />} />
                <Route path="/backgate/elementary" element={<BackgateElementary />} />
                <Route path="/backgate/glebuilding" element={<BackgateGLEBuilding />} />
                <Route path="/backgate/maincanteen" element={<BackgateMainCanteen />} />
                <Route path="/backgate/rtlbuilding" element={<BackgateRTLBuilding />} />
                <Route path="/backgate/ngebuilding" element={<BackgateNGEBuilding />} />
                <Route path="/backgate/librarybuilding" element={<BackgateLibraryBuilding />} />
                <Route path="/backgate/alliedbuilding" element={<BackgateAlliedBuilding />} />
                <Route path="/backgate/highschool-canteen" element={<BackgateHighSchoolCanteen />} />

                {/* Office Routes */}
                <Route path="/offices/acad" element={<AcadOffices />} />
                <Route path="/offices/highschool" element={<HighSchoolBuildingOffices />} />
                <Route path="/offices/elementary" element={<ElementaryBuildingOffices />} />
                <Route path="/offices/gle" element={<GLEBuildingOffices />} />
                <Route path="/offices/rtl" element={<RTLBuildingOffices />} />
                <Route path="/offices/nge" element={<NGEBuildingOffices />} />
                <Route path="/offices/library" element={<LibraryBuildingOffices />} />
                <Route path="/offices/allied" element={<AlliedBuildingOffices />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
