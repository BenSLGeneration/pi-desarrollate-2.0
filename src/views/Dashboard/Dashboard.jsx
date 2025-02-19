import AdminPanel from '../../components/AdminPanel/AdminPanel';
import GeneralSummary from '../../components/GeneralSummary/GeneralSummary';
import Navbar from '../../components/Navbar/Navbar';
import ReservationTable from '../../components/ReservationTable/ReservationTable';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserProfile from '../../components/UserProfile/UserProfile';
import "../../views/Dashboard/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="content-container flex-grow-1 p-5">
      <h2>Welcome!</h2>
      <div className="container">
      <ReservationTable />
      </div>
      <div className="container">
        <div className="row">
          {/* Primera columna: ReservationTable y AdminPanel */}
          <div className="col-lg-8 d-flex flex-column">
            <AdminPanel />
          </div>
          {/* Segunda columna: SummaryCard */}
          <div className="col-lg-4 d-flex">
            <UserProfile />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;