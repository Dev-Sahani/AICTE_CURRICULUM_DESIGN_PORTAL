import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FilterProvider, SubjectProvider, CourseProvider, UserProvider} from "./context";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
    <div className="bg-default">
        <UserProvider>
        <CourseProvider>
        <SubjectProvider>
        <FilterProvider>
            <App/>
        </FilterProvider>
        </SubjectProvider>
        </CourseProvider>
        </UserProvider>
    </div>
)