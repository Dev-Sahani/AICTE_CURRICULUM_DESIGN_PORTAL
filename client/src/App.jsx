import { BrowserRouter, Routes, Route } from "react-router-dom";
import {     
    AnalyticsPage,
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
    RegisterPage,
} from "./pages";
import {
    SharedNav,
    UsersPage,
    VersionPage,
    BasicInfoPage,
    CategoriesPage,
    SubjectPage,
    SemestersPage,
    SubjectRoutes,
} from "./pages/dashboard/CurriculumEditPage";

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
                    <Route 
                        path="curriculum/:common_id" 
                        element={<SharedNav />}
                    >
                        <Route index element={<BasicInfoPage />} />
                        <Route path="categories" element={<CategoriesPage />}>
                            {SubjectRoutes}
                        </Route>
                        <Route path="semesters" element={<SemestersPage />}>
                            {SubjectRoutes}
                        </Route>
                        <Route path="subjects" element={<SubjectPage />}>
                            {SubjectRoutes}
                        </Route>
                        <Route path="versions" element={<VersionPage />} />
                        <Route path="users" element={<UsersPage />} />
                    </Route>

                    <Route path="explore" element={<ExplorePage/>} />
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