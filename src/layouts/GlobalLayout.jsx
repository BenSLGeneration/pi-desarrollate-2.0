import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

import * as styles from "./GlobalLayout.css";

export function GlobalLayout() {
    return (
        <div>
            <div className="content-wrapper">
                <Sidebar />
                <div className="flex-grow-1 navbar-content-wrapper">
                    <Navbar />
                    <div className="layout-content-container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}