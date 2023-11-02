import { BrowserRouter, Routes, Route } from "react-router-dom";
import {     
    AnalyticsPage, 
    DraftPage, 
    ExplorePage,
    NotificationPage,
    ProfilePage,
    ResourcesPage, 
    SharedLayout, 
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
                            <SharedLayout/>
                        </ProtectedRoute>
                    }
                >   
                    <Route index element={<TemplatePage/>} />
                    <Route path="explore" element={<ExplorePage/>} />
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