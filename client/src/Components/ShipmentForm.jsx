
import { useState } from 'react';

function ShipmentForm(props) {

  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!sender.trim() || !receiver.trim() || !address.trim()) {
      setError('Please fill all fields');
      return;
    }

    const newShipment = {
      sender: sender.trim(),
      receiver: receiver.trim(),
      address: address.trim()
    };

    setError('');
    setIsSubmitting(true);

    try {
      const success = await props.onAddShipment(newShipment);

      if (success) {
        setSender('');
        setReceiver('');
        setAddress('');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="shipment-form">
      <h2>Create New Shipment</h2>

      <form onSubmit={handleSubmit}>

        <label>Sender Name</label>
        <input
          type="text"
          value={sender}
          onChange={(event) => setSender(event.target.value)}
          placeholder="Enter sender name"
        />

        <label>Receiver Name</label>
        <input
          type="text"
          value={receiver}
          onChange={(event) => setReceiver(event.target.value)}
          placeholder="Enter receiver name"
        />

        <label>Delivery Address</label>
        <textarea
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Enter delivery address"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Shipment'}
        </button>

      </form>
    </div>
  );
}

export default ShipmentForm;
