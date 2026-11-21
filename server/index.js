
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Temporary shipment data
let shipments = [
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
];

let nextId = 1004;

// Check whether the server is running
app.get('/', (req, res) => {
  res.send('SwiftTrack backend is running');
});

// GET all shipments
app.get('/api/shipments', (req, res) => {
  res.json(shipments);
});

// GET one shipment
app.get('/api/shipments/:id', (req, res) => {
  const shipment = shipments.find(
    (item) => item.id === req.params.id
  );

  if (!shipment) {
    return res.status(404).json({
      message: 'Shipment not found'
    });
  }

  res.json(shipment);
});

// CREATE a shipment
app.post('/api/shipments', (req, res) => {
  const { sender, receiver, address } = req.body;

  if (
    typeof sender !== 'string' ||
    typeof receiver !== 'string' ||
    typeof address !== 'string' ||
    !sender.trim() ||
    !receiver.trim() ||
    !address.trim()
  ) {
    return res.status(400).json({
      message: 'Valid sender, receiver and address are required'
    });
  }

  const newShipment = {
    id: 'ST' + nextId,
    sender: sender.trim(),
    receiver: receiver.trim(),
    address: address.trim(),
    status: 'Created'
  };

  shipments.push(newShipment);
  nextId++;

  res.status(201).json(newShipment);
});

// UPDATE shipment details
app.put('/api/shipments/:id', (req, res) => {
  const shipment = shipments.find(
    (item) => item.id === req.params.id
  );

  if (!shipment) {
    return res.status(404).json({
      message: 'Shipment not found'
    });
  }

  if (shipment.status !== 'Created') {
    return res.status(400).json({
      message: 'Only Created shipments can be edited'
    });
  }

  const { sender, receiver, address } = req.body;

  if (
    typeof sender !== 'string' ||
    typeof receiver !== 'string' ||
    typeof address !== 'string' ||
    !sender.trim() ||
    !receiver.trim() ||
    !address.trim()
  ) {
    return res.status(400).json({
      message: 'Valid sender, receiver and address are required'
    });
  }

  shipment.sender = sender.trim();
  shipment.receiver = receiver.trim();
  shipment.address = address.trim();

  res.json(shipment);
});

// DELETE a shipment
app.delete('/api/shipments/:id', (req, res) => {
  const shipment = shipments.find(
    (item) => item.id === req.params.id
  );

  if (!shipment) {
    return res.status(404).json({
      message: 'Shipment not found'
    });
  }

  if (shipment.status !== 'Created') {
    return res.status(400).json({
      message: 'Only Created shipments can be deleted'
    });
  }

  shipments = shipments.filter(
    (item) => item.id !== req.params.id
  );

  res.json({
    message: 'Shipment deleted successfully'
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
