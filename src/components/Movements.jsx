import moment from "moment";

function Movements({ movements }) {
  // Ordenar movimientos por fecha descendente
  const sortedMovements = [...movements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="p-3 border rounded">
      <h3>Movimientos</h3>
      <ul className="list-group">
        {sortedMovements.map((mov) => (
          <li
            key={mov.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              mov.amount > 0 ? "list-group-item-success" : "list-group-item-danger"
            }`}
          >
            <div>
              <strong>{mov.type.charAt(0).toUpperCase() + mov.type.slice(1)}</strong>
              <br />
              <small className="text-muted">{moment(mov.date).fromNow()}</small>
            </div>
            <span>{mov.amount.toFixed(2)}€</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movements;