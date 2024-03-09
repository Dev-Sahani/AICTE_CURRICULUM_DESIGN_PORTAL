import SharedNav from "./SharedNav";
import BasicInfoPage from "./BasicInfoPage";
import CategoriesPage from "./CategoriesPage";
import SubjectPage from "./SubjectsPage";
import SubjectModal from "./SubjectModal/index"
import { SubjectBasicInfo, SubjectSyllabus, SubjectResources } from "./SubjectModal/index";
import SemestersPage from "./SemestersPage";
import VersionPage from "./VersionPage";
import UsersPage from "./userpage/UsersPage";
import { Route } from "react-router-dom";

const SubjectRoutes = <Route path=":subject_common_id" element={<SubjectModal />}>
  <Route index element={<SubjectBasicInfo />} />
  <Route path="syllabus" element={<SubjectSyllabus />} />
  <Route path="resources" element={<SubjectResources />} />
</Route>

export  {
  BasicInfoPage,
  CategoriesPage,
  SubjectPage,
  SemestersPage,
  SharedNav,
  VersionPage,
  UsersPage,
  SubjectRoutes,
};

//export const CurriculumEditPageRoutes = [
//   {
//     index: true,
//     element: <BasicInfoPage />
//   },
//   {
//     path: "categories",
//     element: <CategoriesPage />,
//     subRoute:":subject_common_id",
//     subRouteEl:<SubjectModal />
//   },
//   {
//     path: "subjects",
//     element: <SubjectPage />,
//     subRoute:":subject_common_id",
//     subRouteEl:<SubjectModal />
//   },
//   {
//     path: "semesters",
//     element: <SemestersPage />,
//     subRoute:":subject_common_id",
//     subRouteEl:<SubjectModal />,
//   }  ,
//   {
//     path: "versions",
//     element: <VersionPage />
//   },
//   {
//     path: "users",
//     element:<UsersPage />
//   }
// ].map((props, ind) => (
//   <Route {...props} key={ind}>
//     {props.subRoute && <Route path={props.subRoute} element={props.subRouteEl}/>}
//   </Route>
// ));