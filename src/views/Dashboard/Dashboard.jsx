import AdminPanel from '../../components/AdminPanel/AdminPanel';
import GeneralSummary from '../../components/GeneralSummary/GeneralSummary';
import ReservationTable from '../../components/ReservationTable/ReservationTable';
import UserProfile from '../../components/UserProfile/UserProfile';

const Dashboard = () => {
  return (
    <div>
      <GeneralSummary />
      <ReservationTable />
      <AdminPanel />
      <UserProfile />
    </div>
  );
};

export default Dashboard;