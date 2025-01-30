import "../../views/Dashboard/Dashboard.css"

const SummaryCard = ({ icon, title, value, color }) => {
    return (
        <div className={`summary-card ${color}`}>
            <div>
                <i className={`bi ${icon}`}></i>
                {title}
            </div>
            <span>{value}</span>
        </div>
    );
};

export default SummaryCard;