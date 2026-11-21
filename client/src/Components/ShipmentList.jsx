import StatusBadge from './StatusBadge';

function ShipmentList(props) {
  return (
    <div className="shipment-list">
      <h2>Shipment List</h2>

      <table>
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Receiver</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {props.shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
              <td>{shipment.receiver}</td>
              <td>
                <StatusBadge status={shipment.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShipmentList;
