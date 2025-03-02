function Summary({ movements }) {
    const deposits = movements
      .filter((mov) => mov.amount > 0)
      .reduce((acc, mov) => acc + mov.amount, 0);
    const withdrawals = movements
      .filter((mov) => mov.amount < 0)
      .reduce((acc, mov) => acc + mov.amount, 0);
  
    return (
      <div className="p-3 border rounded">
        <h3>Resumen</h3>
        <p>Entradas: {deposits.toFixed(2)}€</p>
        <p>Salidas: {Math.abs(withdrawals).toFixed(2)}€</p>
      </div>
    );
  }
  
  export default Summary;