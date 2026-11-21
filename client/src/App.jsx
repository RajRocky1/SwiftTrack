
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ShipmentList from './components/ShipmentList';
import ShipmentForm from './Components/ShipmentForm';
import './App.css';

function App() {

  const [shipments, setShipments] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Get shipments from the backend - connecting frontend to backend
  async function fetchShipments() {
    try {
      const response = await fetch('http://localhost:5000/api/shipments');

      if (!response.ok) {
        throw new Error('Failed to fetch shipments');
      }

      const data = await response.json();
      setShipments(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  // Load shipments when the page opens
  useEffect(() => {
    fetchShipments();
  }, []);

  // Send a new shipment to the backend
  async function addShipment(newShipment) {
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/shipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newShipment)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create shipment');
      }

      await fetchShipments();

      setMessage('Shipment created successfully: ' + data.id);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
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
        {error && <p className="error">{error}</p>}

        <ShipmentList shipments={shipments} />
      </main>
    </div>
  );
}

export default App;
