
import { useState } from 'react';
import Navbar from './Components/Navbar';
import ShipmentList from './Components/ShipmentList';
import ShipmentForm from './Components/ShipmentForm';
import './App.css';

function App() {

  const [shipments, setShipments] = useState([
    {
      id: 'ST1001',
      sender: 'Ramesh',
      receiver: 'Raj',
      address: 'Mysuru',
      status: 'Created'
    },
    {
      id: 'ST1002',
      sender: 'Suresh',
      receiver: 'Ravi',
      address: 'Bengaluru',
      status: 'In Transit'
    },
    {
      id: 'ST1003',
      sender: 'Mahesh',
      receiver: 'Kumar',
      address: 'Mandya',
      status: 'Delivered'
    }
  ]);

  const [nextId, setNextId] = useState(1004);
  const [message, setMessage] = useState('');

  function addShipment(newShipment) {

    const shipment = {
      id: 'ST' + nextId,
      ...newShipment,
      status: 'Created'
    };

    setShipments([...shipments, shipment]);

    setNextId(nextId + 1);

    setMessage('Shipment created successfully: ' + shipment.id);
  }

  const totalShipments = shipments.length;

  const inTransit = shipments.filter(
    (shipment) => shipment.status === 'In Transit'
  ).length;

  const delivered = shipments.filter(
    (shipment) => shipment.status === 'Delivered'
  ).length;

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

        <ShipmentForm onAddShipment={addShipment} />

        {message && <p className="success">{message}</p>}

        <ShipmentList shipments={shipments} />
      </main>
    </div>
  );
}

export default App;
