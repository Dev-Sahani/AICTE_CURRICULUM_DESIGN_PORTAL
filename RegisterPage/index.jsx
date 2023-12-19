import FrontPage from "./frontPage"
import AdminPage from "./AdminPage";
import CurriculumDevelopers from "./CurriculumDevelopers";

function RegisterPage(){
    let Admin=false;
    if(Admin) {
        return <FrontPage>
            <AdminPage />
        </FrontPage>
    }
    return(<>
        <FrontPage>
            <CurriculumDevelopers />
        </FrontPage>
    </>)
}
export default RegisterPage