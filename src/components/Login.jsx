import { useState } from "react";
import accounts from "../data/accounts"; // Importa las cuentas generadas
import { Form, Button, Container, Alert, Navbar } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const formattedUsername = username.trim().toLowerCase();
    const foundUser = accounts.find(
      (acc) =>
        acc.username.toLowerCase() === formattedUsername &&
        acc.pin.toString() === pin
    );

    if (foundUser) {
      setUser(foundUser);
      setError("");
    } else {
      setError("Usuario o PIN incorrecto");
    }
  };

  return (
    <>
      <Navbar className="px-4 py-3 ml-2 mr-2" style={{ background: "transparent" }}>
        <Container fluid className="d-flex align-items-center justify-content-between">
          {/* Margen superior izquierdo: Nombre del banco */}
          <Navbar.Brand className="fw-bold" style={{ fontSize: "1.5rem" }}>
          Banco Mano Rápida
          </Navbar.Brand>

          {/* Centro: Logo */}
          <div className="position-absolute start-50 translate-middle-x">
            <img src="/logo.png" alt="Logo" style={{ height: "50px" }} />
          </div>

          {/* Margen superior derecho: Formulario de Login */}
          <div className="ms-auto d-flex align-items-center gap-2" style={{ minWidth: "300px" }}>
            <Form.Control
              type="text"
              placeholder="user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-pill px-3 py-2 border-0 shadow-sm"
              style={{ width: "130px", background: "#f8f9fa" }}
            />
            <Form.Control
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="rounded-pill px-3 py-2 border-0 shadow-sm"
              style={{ width: "130px", background: "#f8f9fa" }}
            />
            <Button
              onClick={handleLogin}
              type="button"
              className="rounded-circle border-0 d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: "40px", height: "40px", background: "#f8f9fa" }}
            >
              <ArrowRight size={20} color="#6c757d" />
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Error si el usuario se equivoca */}
      <Container className="mt-3">
        {error && <div className="alert alert-danger">{error}</div>}
      </Container>
    </>
  );
}

export default Login;
