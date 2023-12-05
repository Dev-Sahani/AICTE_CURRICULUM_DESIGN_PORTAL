import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FilterProvider } from "./context/FilterContext";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
    <div className="bg-default">
        <FilterProvider>
            <App/>
        </FilterProvider>
    </div>
)