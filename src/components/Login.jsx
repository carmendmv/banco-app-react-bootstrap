import { useState } from "react";
import accounts from "../data/accounts";
import { Form, Button, Container, Alert } from "react-bootstrap";

function Login({ setUser }) {
  // Defino los estados locales para manejar el input del usuario y el PIN
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores de autenticación

  const handleLogin = () => {
    // Quito espacios en blanco y paso el username a minúsculas para evitar errores de formato
    const formattedUsername = username.trim().toLowerCase();
    
    // Busco una cuenta que coincida con el username y el PIN introducido
    const user = accounts.find(
      (acc) => acc.username.toLowerCase() === formattedUsername && acc.pin.toString() === pin
    );

    if (user) {
      setUser(user); // Guardo el usuario autenticado en el estado global
      setError("");  // Limpio errores previos si la autenticación es exitosa
    } else {
      setError("Usuario o PIN incorrecto"); // Muestro un mensaje de error si las credenciales no coinciden
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <div className="p-4 border rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center">Iniciar Sesión</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>PIN</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleLogin} className="w-100">
            Acceder
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
