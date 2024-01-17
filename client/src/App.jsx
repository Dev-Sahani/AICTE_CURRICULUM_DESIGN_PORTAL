import { BrowserRouter, Routes, Route } from "react-router-dom";
import {     
    AnalyticsPage, 
    CommitteePage, 
    ExplorePage,
    NotificationPage,
    ProfilePage,
    ResourcesPage, 
    SharedLayout, 
    TemplatePage,
    CurriculumEditPageRoutes,
    SharedNav,
}  from "./pages/dashboard";
import {
    ErrorPage, 
    LandingPage, 
    ProtectedRoute, 
    RegisterPage,
} from "./pages";
import { useUserContext } from "./context";

const App = ()=>{
    const {alert} =  useUserContext();
    if(alert){
        window.alert(alert)
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"
                    element={
                        <ProtectedRoute>
                            <SharedLayout/>
                        </ProtectedRoute>
                    }
                >   
                    <Route index element={<TemplatePage/>} />
                    <Route 
                        path="curriculum/:common_id" 
                        element={<SharedNav />}
                    >
                        {CurriculumEditPageRoutes}
                    </Route>
                    <Route path="explore" element={<ExplorePage/>} />
                    <Route path="committee" element={<CommitteePage/>} />
                    <Route path="analytics" element={<AnalyticsPage/>} />
                    <Route path="notification" element={<NotificationPage />} />
                    <Route path="resources" element={<ResourcesPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                </Route>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;