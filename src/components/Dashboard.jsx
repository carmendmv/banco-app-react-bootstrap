import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { formatDistanceToNow, format } from "date-fns";
<<<<<<< HEAD
import { es } from "date-fns/locale";
=======
import { es } from "date-fns/locale"; // Importar español
>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71

function Dashboard({ user, balance, transactions, setUser }) {
  const [currentBalance, setCurrentBalance] = useState(balance);
  const [transactionList, setTransactionList] = useState(transactions);
  const [message, setMessage] = useState(null);
  const [sortTransactions, setSortTransactions] = useState(false);

  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [confirmUser, setConfirmUser] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleLogout(); // Cerrar sesión cuando el tiempo llegue a cero
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

<<<<<<< HEAD
=======
  // Calcular estadísticas
>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71
  const totalIn = transactionList
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalOut = transactionList
    .filter((tx) => tx.amount < 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
  const interest = totalIn * 0.02;

  const handleLogout = () => {
    setUser(null);
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
<<<<<<< HEAD
    if (!transferTo || isNaN(amount) || amount <= 0 || amount > currentBalance) {
      setMessage("Transferencia inválida. Verifica los datos.");
      return;
    }
=======

    if (
      !transferTo ||
      isNaN(amount) ||
      amount <= 0 ||
      amount > currentBalance
    ) {
      setMessage("Transferencia inválida. Verifica los datos.");
      return;
    }

>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71
    setCurrentBalance((prev) => prev - amount);
    setTransactionList([
      ...transactionList,
      { type: "RETIRO", date: new Date().toISOString(), amount: -amount },
    ]);
    setMessage(`Transferencia de ${amount.toFixed(2)}€ realizada con éxito.`);
  };

  const handleLoan = () => {
    const amount = parseFloat(loanAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage("El préstamo debe ser una cantidad positiva.");
      return;
    }
    if (amount > currentBalance * 2) {
      setMessage(
        "El préstamo supera el 200% de su saldo y no puede ser aprobado.",
      );
      return;
    }
<<<<<<< HEAD
=======

>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71
    setCurrentBalance((prev) => prev + amount);
    setTransactionList([
      ...transactionList,
      { type: "DEPÓSITO", date: new Date().toISOString(), amount },
    ]);
    setMessage("Préstamo aprobado y depositado en su cuenta.");
  };

  const handleCloseAccount = () => {
    if (confirmUser === user.owner && confirmPin === user.pin.toString()) {
      if (
        window.confirm(
          "¿Seguro que deseas eliminar tu cuenta? Esta acción es irreversible.",
        )
      ) {
        setUser(null);
        setMessage("Tu cuenta ha sido eliminada.");
      }
    } else {
      setMessage("Usuario o PIN incorrectos.");
    }
  };

<<<<<<< HEAD
  const formatDate = function (date) {
    const transactionDate = new Date(date);

    if (isNaN(transactionDate)) {
      return "Fecha inválida";
    }
=======
  // Función para formatear fechas
  const formatDate = function (date) {
    const transactionDate = new Date(date);

    // Verificar si la fecha es válida
    if (isNaN(transactionDate)) {
      return "Fecha inválida";
    }

    // Si la fecha está en el futuro, mostrarla en formato completo (día, mes, año, hora)
    if (transactionDate > new Date()) {
      return format(transactionDate, "d 'de' MMMM 'de' yyyy, HH:mm", {
        locale: es,
      });
    }

    // Si la fecha está en el pasado, mostrarla de forma relativa ("hace X días"), sin la palabra "alrededor"
    const relativeTime = formatDistanceToNow(transactionDate, {
      locale: es,
      addSuffix: true,
    });

    // Evitar la palabra "alrededor" que aparece cuando el cálculo está cerca de un mes o año
    if (relativeTime.includes("alrededor de")) {
      return format(transactionDate, "d 'de' MMMM 'de' yyyy, HH:mm", {
        locale: es,
      });
    }

    return relativeTime; // "hace X días"
  };
>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71

    if (transactionDate > new Date()) {
      return format(transactionDate, "d 'de' MMMM 'de' yyyy, HH:mm", {
        locale: es,
      });
    }

    const relativeTime = formatDistanceToNow(transactionDate, {
      locale: es,
      addSuffix: true,
    });

    if (relativeTime.includes("alrededor de")) {
      return format(transactionDate, "d 'de' MMMM 'de' yyyy, HH:mm", {
        locale: es,
      });
    }

    return relativeTime;
  };

  // Ordenar las transacciones por fecha
  const sortedTransactions = sortTransactions
    ? [...transactionList].sort((a, b) => new Date(a.date) - new Date(b.date))
    : [...transactionList].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Container className="mt-4">
      {message && <Alert variant="info">{message}</Alert>}

      <Row className="mb-4">
<<<<<<< HEAD
        <Col><h2>Hola, {user.owner}</h2></Col>
        <Col className="text-end"><h2>{currentBalance.toFixed(2)}€</h2></Col>
=======
        <Col>
          <h2>Bienvenido, {user.owner}</h2>
        </Col>
        <Col className="text-end">
          <h2>{currentBalance.toFixed(2)}€</h2>
        </Col>
>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71
      </Row>

      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
            <Card.Title>
                Historial de Transacciones
                <Form.Check
                  type="checkbox"
                  label="Ordenar por fecha ascendente"
                  className="ms-3 d-inline-block"
                  checked={sortTransactions}
                  onChange={() => setSortTransactions((prev) => !prev)}
                />
              </Card.Title>
              <Table striped bordered hover className="mt-2">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTransactions.map((tx, index) => (
                    <tr key={index}>
                      <td>
                        <span
                          className={`badge bg-${tx.amount > 0 ? "success" : "danger"}`}
                        >
                          {tx.amount > 0 ? "DEPÓSITO" : "RETIRO"}
                        </span>
                      </td>
<<<<<<< HEAD
                      <td>{formatDate(tx.date)}</td>
=======
                      <td>{formatDate(tx.date)}</td>{" "}
                      {/* Muestra "hace X días" o fecha completa */}
>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71
                      <td>{tx.amount.toFixed(2)}€</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <div className="d-flex flex-column gap-3 mt-6">
            <Card className="bg-warning">
              <Card.Body>
                <Card.Title>Transferencia</Card.Title>
                <Form>
                  <Row className="align-items-center">
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Nombre y apellidos"
                        value={transferTo}
                        onChange={(e) => setTransferTo(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Monto"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                      />
                    </Col>
                    <Col xs="auto">
<<<<<<< HEAD
                      <Button variant="dark" onClick={handleTransfer}>→</Button>
=======
                      <Button variant="dark" onClick={handleTransfer}>
                        →
                      </Button>
>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <Card className="bg-success">
              <Card.Body>
                <Card.Title>Solicitar Préstamo</Card.Title>
                <Form>
                  <Row className="align-items-center">
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Monto"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                      />
                    </Col>
                    <Col xs="auto">
<<<<<<< HEAD
                      <Button variant="dark" onClick={handleLoan}>→</Button>
=======
                      <Button variant="dark" onClick={handleLoan}>
                        →
                      </Button>
>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <Card className="bg-danger">
              <Card.Body>
                <Card.Title>Cerrar Cuenta</Card.Title>
                <Form>
                  <Row className="align-items-center">
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Nombre y apellidos"
                        value={confirmUser}
                        onChange={(e) => setConfirmUser(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="password"
                        placeholder="PIN"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                      />
                    </Col>
                    <Col xs="auto">
<<<<<<< HEAD
                      <Button variant="dark" onClick={handleCloseAccount}>→</Button>
=======
                      <Button variant="dark" onClick={handleCloseAccount}>
                        →
                      </Button>
>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* ESTADÍSTICAS */}
      <Row className="mt-3">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Ingresos</Card.Title>
              <Card.Text>{totalIn.toFixed(2)}€</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Gastos</Card.Title>
              <Card.Text>{Math.abs(totalOut).toFixed(2)}€</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Intereses</Card.Title>
              <Card.Text>{interest.toFixed(2)}€</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Tiempo Restante</Card.Title>
              <Card.Text>
                {Math.floor(timeLeft / 60)}:{timeLeft % 60}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

<<<<<<< HEAD
      <footer className="text-center mt-4 mb-5 border-top pt-3">
        <p>Has iniciado sesión como <strong>{user.owner}</strong></p>
        <Button variant="link" onClick={handleLogout}>Cerrar sesión</Button>
=======
      <footer className="text-center mt-4 mb-5 border-top: 1px solid black pt-3">
        <p>
          Has iniciado sesión como <strong>{user.owner}</strong>
        </p>
        <Button variant="link" onClick={handleLogout}>
          Cerrar sesión
        </Button>
>>>>>>> 58ddf36508124cf96b89fe49ab450b0fb43bbf71
      </footer>
    </Container>
  );
}

export default Dashboard;
