import AdminPanel from '../../components/AdminPanel/AdminPanel';
import GeneralSummary from '../../components/GeneralSummary/GeneralSummary';
import Navbar from '../../components/Navbar/Navbar';
import ReservationTable from '../../components/ReservationTable/ReservationTable';
import Sidebar from '../../components/Sidebar/Sidebar';
import UserProfile from '../../components/UserProfile/UserProfile';
import "../../views/Dashboard/Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar style={{ marginBottom: '20px' }} /> {/* Agrega espacio debajo */}
        <div className="content-container flex-grow-1 p-4">
          <GeneralSummary />
          <ReservationTable />
          <AdminPanel />
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;