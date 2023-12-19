import SharedLayout from "./SharedLayout";
import AdminCurriculum from "./AdminCurriculum";
import DevelopersPage from "./DevelopersPage";

export default function RegisterPage(){
    const admin = true;
    if(admin) {
        return (
            <SharedLayout>
                <AdminCurriculum />
            </SharedLayout>
        )
    }
    return (
        <SharedLayout>
            <DevelopersPage />
        </SharedLayout>
    )
}