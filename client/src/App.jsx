
import Navbar from './Components/Navbar';
import ShipmentList from './Components/ShipmentList';
import './App.css';

function App() {

  const shipments = [
    {
      id: 'ST1001',
      receiver: 'Raj',
      status: 'Created'
    },
    {
      id: 'ST1002',
      receiver: 'Ravi',
      status: 'In Transit'
    },
    {
      id: 'ST1003',
      receiver: 'Kumar',
      status: 'Delivered'
    },
    {
      id: 'ST1004',
      receiver: 'Arun',
      status: 'Delivered'
    }
  ];

  const totalShipments = shipments.length;

  const inTransit = shipments.filter((shipment) => shipment.status === 'In Transit').length;

  const delivered = shipments.filter((shipment) => shipment.status === 'Delivered').length;

  return (
    <div>
      <Navbar />

      <main className="dashboard">
        <h1>Shipment Dashboard</h1>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Shipments</h3>
            <h2>{totalShipments}</h2>
          </div>

          <div className="card">
            <h3>In Transit</h3>
            <h2>{inTransit}</h2>
          </div>

          <div className="card">
            <h3>Delivered</h3>
            <h2>{delivered}</h2>
          </div>
        </div>

        <ShipmentList shipments={shipments} />
      </main>
    </div>
  );
}

export default App;
