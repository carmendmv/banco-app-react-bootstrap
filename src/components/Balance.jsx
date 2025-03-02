function Balance({ balance }) {
    return (
      <div className="p-3 border rounded">
        <h3>Saldo Actual</h3>
        <h4>{balance.toFixed(2)}€</h4>
      </div>
    );
  }
  
  export default Balance;