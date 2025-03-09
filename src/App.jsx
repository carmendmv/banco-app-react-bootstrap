import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  

  return (
    <div className="container mt-5">
      {user ? (
        <Dashboard
          user={user}
          setUser={setUser}
        />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;
