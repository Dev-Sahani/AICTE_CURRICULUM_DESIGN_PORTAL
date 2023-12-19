import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FilterProvider, ChangesProvider, CourseProvider, UserProvider} from "./context";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
    <div className="bg-default">
        <UserProvider>
        <CourseProvider>
        <ChangesProvider>
        <FilterProvider>
            <App/>
        </FilterProvider>
        </ChangesProvider>
        </CourseProvider>
        </UserProvider>
    </div>
)