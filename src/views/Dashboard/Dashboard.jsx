import AdminPanel from '../../components/AdminPanel/AdminPanel';
import GeneralSummary from '../../components/GeneralSummary/GeneralSummary';
import ReservationTable from '../../components/ReservationTable/ReservationTable';

const Dashboard = () => {
  return (
    <div>
      <GeneralSummary />
      <ReservationTable />
      <AdminPanel />
    </div>
  );
};

export default Dashboard;