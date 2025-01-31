import AdminPanel from '../../components/AdminPanel/AdminPanel';
import GeneralSummary from '../../components/GeneralSummary/GeneralSummary';
import ReservationTable from '../../components/ReservationTable/ReservationTable';
import UserProfile from '../../components/UserProfile/UserProfile';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';

const Dashboard = () => {
  return (
    <div className=''>
      <Navbar />
      <Sidebar />
      <GeneralSummary />
      <ReservationTable />
      <AdminPanel />
      <UserProfile />
    </div>
  );
};

export default Dashboard;