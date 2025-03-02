import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

// Función para generar una fecha aleatoria en formato ISO
const getRandomDate = () => {
  const start = new Date(2024, 0, 1).getTime(); // 1 de enero de 2024
  const end = new Date(2025, 11, 31).getTime(); // 31 de diciembre de 2025
  return moment(new Date(start + Math.random() * (end - start))).toISOString(); // Formato ISO
};

// Función para generar transacciones aleatorias
const generateRandomTransactions = (num) => {
  return Array.from({ length: num }, () => ({
    amount: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1000 + 50), // Valores entre ±50€ y ±1050€
    date: getRandomDate(), // Se almacena en formato ISO
  }));
};

function App() {
  const [user, setUser] = useState(null);
  const [transactions] = useState(() =>
    generateRandomTransactions(10).map(tx => ({
      ...tx,
      date: moment(tx.date).toISOString(), // Asegura formato ISO
    }))
  );
  const balance = 3840.0;

  return (
    <div className="container mt-5">
      {user ? (
        <Dashboard user={user} balance={balance} transactions={transactions} setUser={setUser} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;