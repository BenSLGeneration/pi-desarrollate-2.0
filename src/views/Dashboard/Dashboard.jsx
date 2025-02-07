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
    <GeneralSummary />
    <ReservationTable />
    <AdminPanel />
    <UserProfile />
  </div>
  );
};

export default Dashboard;