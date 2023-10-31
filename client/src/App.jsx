import { BrowserRouter, Routes, Route } from "react-router-dom";
import {     
    AnalyticsPage, 
    DraftPage, 
    ExplorePage,
    NotificationPage,
    ProfilePage,
    ResourcesPage, 
    SideBar, 
    TemplatePage,
}  from "./pages/dashboard";
import {
    ErrorPage, 
    LandingPage, 
    ProtectedRoute, 
    RegisterPage 
} from "./pages";

const App = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"
                    element={
                        <ProtectedRoute>
                            <SideBar/>
                        </ProtectedRoute>
                    }
                >   
                    <Route index element={<ExplorePage />}/>
                    <Route path="course-templates" element={<TemplatePage/>} />
                    <Route path="drafts" element={<DraftPage/>} />
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