import GeneralSummary from '../../components/GeneralSummary/GeneralSummary';
import ReservationTable from '../../components/ReservationTable/ReservationTable';

const Dashboard = () => {
  return (
    <div>
      <GeneralSummary />
      <ReservationTable />
    </div>
  );
};

export default Dashboard;