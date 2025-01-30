import SummaryCard from '../SummaryCard/SummaryCard';
import "../../views/Dashboard/Dashboard.css"

const GeneralSummary = () => {
    return (
        <div className="container my-4">
            <div className="card shadow-sm p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 fw-bold">Resumen General</h5>
                    <select className="form-select w-auto">
                        <option>Diario</option>
                        <option>Semanal</option>
                        <option>Mensual</option>
                    </select>
                </div>
                <div className="row g-3">
                    <div className="col-12 col-md-3">
                        <SummaryCard icon="bi-check-circle-fill" title="Check In" value="20" color="green" />
                    </div>
                    <div className="col-12 col-md-3">
                        <SummaryCard icon="bi-x-circle-fill" title="Check Out" value="20" color="red" />
                    </div>
                    <div className="col-12 col-md-3">
                        <SummaryCard icon="bi-info-circle-fill" title="Disponibles" value="20" color="blue" />
                    </div>
                    <div className="col-12 col-md-3">
                        <SummaryCard icon="bi-calendar-check-fill" title="Reservados" value="20" color="yellow" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralSummary;