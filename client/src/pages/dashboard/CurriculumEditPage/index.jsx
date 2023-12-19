import { Route } from "react-router-dom";
import SharedNav from "./SharedNav";
import BasicInfoPage from "./BasicInfoPage";
import CategoriesPage from "./CategoriesPage";
import SubjectPage from "./SubjectsPage";
import SemestersPage from "./SemestersPage";

export  {
  BasicInfoPage,
  CategoriesPage,
  SubjectPage,
  SemestersPage,
  SharedNav,
};

export const CurriculumEditPageRoutes = [
  {
    index: true,
    element: <BasicInfoPage />
  },
  {
    path: "categories",
    element: <CategoriesPage />
  },
  {
    path: "subjects",
    element: <SubjectPage />
  },
  {
    path: "semesters",
    element: <SemestersPage />
  }
].map((props) => <Route {...props} />);