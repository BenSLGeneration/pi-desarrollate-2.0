import { useState, useEffect } from "react";
import "../../views/Dashboard/Dashboard.css"

const SummaryCard = ({ icon, title, value, color }) => {
    return (
        <div className={`summary-card ${color} p-4 rounded-3 shadow-sm hover-effect`}>
            <div className="d-flex align-items-center">
                <i className={`bi ${icon} fs-3 me-3`}></i>
                <div>
                    <h6 className="mb-0 fw-bold">{title}</h6>
                    <span className="fs-4 fw-bold">{value}</span>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;