import React, { useState, useEffect } from "react"; 
import { Container, Row, Col, Card, Table, Form, Button, Alert } from "react-bootstrap";

function Dashboard({ user, balance, transactions, setUser, accounts, setAccounts }) {
  // Inicializo el estado de varias variables para manejar el balance, monto de transferencia, préstamo, y otras configuraciones
  const [currentBalance, setCurrentBalance] = useState(balance);
  const [transferTo, setTransferTo] = useState(""); 
  const [transferAmount, setTransferAmount] = useState(""); 
  const [loanAmount, setLoanAmount] = useState(""); 
  const [confirmUser, setConfirmUser] = useState(""); 
  const [confirmPin, setConfirmPin] = useState(""); 
  const [transactionList, setTransactionList] = useState(transactions); 
  const [message, setMessage] = useState(null); 

  // A continuación, calculo los ingresos y gastos totales de las transacciones, así como los intereses generados
  const totalIn = transactionList.filter(tx => tx.amount > 0).reduce((acc, tx) => acc + tx.amount, 0); // Filtrar transacciones positivas
  const totalOut = transactionList.filter(tx => tx.amount < 0).reduce((acc, tx) => acc + tx.amount, 0); // Filtrar transacciones negativas
  const interest = totalIn * 0.012; // Calcular intereses como un 1.2% de los ingresos

  // Configuro un temporizador para contar los segundos restantes
  const [timeLeft, setTimeLeft] = useState(300); // Iniciar el temporizador en 300 segundos (5 minutos)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)); // Reducir el tiempo cada segundo
    }, 1000);
    return () => clearInterval(timer); // Limpiar el temporizador cuando el componente se desmonte
  }, []);

  // Formateo la fecha de cada transacción para mostrar solo la parte de la fecha (sin hora)
  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  // Función para manejar las transferencias entre cuentas
  const handleTransfer = () => {
    const amount = parseFloat(transferAmount); // Aseguro que el monto sea un número válido
    // Verifico que los datos de la transferencia sean correctos (cantidad válida, cuenta de destino)
    if (!transferTo || isNaN(amount) || amount <= 0 || amount > currentBalance) {
      setMessage("Transferencia inválida. Verifica los datos.");
      return;
    }
    // Busco la cuenta de destino por nombre y verifico que exista
    const recipientIndex = accounts.findIndex(acc => acc.owner.toLowerCase() === transferTo.toLowerCase());
    if (recipientIndex === -1) {
      setMessage("La cuenta de destino no existe.");
      return;
    }
    // Actualizo el balance de la cuenta de destino y la cuenta del usuario
    const updatedAccounts = [...accounts];
    updatedAccounts[recipientIndex].balance += amount;
    setAccounts(updatedAccounts);
    setCurrentBalance(prev => prev - amount); // Actualizo el balance del usuario
    setTransactionList([...transactionList, { type: "WITHDRAWAL", date: formatDate(new Date()), amount: -amount }]);
    setMessage(`Transferencia de ${amount.toFixed(2)}€ realizada con éxito a ${accounts[recipientIndex].owner}.`);
  };

  // Función para manejar la solicitud de préstamo
  const handleLoan = () => {
    const amount = parseFloat(loanAmount); // Aseguro que el monto sea un número válido
    // Verifico que el monto sea mayor a cero y que no supere el 200% del saldo actual
    if (isNaN(amount) || amount <= 0) {
      setMessage("El préstamo debe ser una cantidad positiva.");
      return;
    }
    if (amount > currentBalance * 2) {
      setMessage("El préstamo supera el 200% de su saldo actual y no puede ser aprobado.");
      return;
    }
    setCurrentBalance(prev => prev + amount); // Aumento el balance del usuario con el monto del préstamo
    setTransactionList([...transactionList, { type: "DEPOSIT", date: formatDate(new Date()), amount }]);
    setMessage("Préstamo aprobado y depositado en su cuenta.");
  };

  // Función para manejar el cierre de la cuenta del usuario
  const handleCloseAccount = () => {
    // Verifico que el nombre de usuario y el PIN sean correctos
    if (confirmUser === user.owner && confirmPin === user.pin.toString()) {
      if (window.confirm("¿Está seguro de que desea eliminar completamente su cuenta? Esta acción es irreversible.")) {
        setAccounts(accounts.filter(acc => acc.owner !== user.owner)); // Elimino la cuenta del usuario
        setUser(null); // Desconecto al usuario
        setMessage("Su cuenta ha sido eliminada permanentemente.");
      }
    } else {
      setMessage("Nombre de usuario o PIN incorrectos.");
    }
  };

  return (
    <Container className="mt-4">
      {message && <Alert variant="info">{message}</Alert>} {/* Si hay un mensaje, lo muestro en un Alert */}
      <Row className="mb-4">
        <Col><h2>Bienvenido, {user.owner}</h2></Col>
        <Col className="text-end"><h2>{currentBalance.toFixed(2)}€</h2></Col>
      </Row>
      <Row>
        {/* COLUMNA IZQUIERDA - HISTORIAL */}
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Historial de Transacciones</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr><th>Tipo</th><th>Fecha</th><th>Monto</th></tr>
                </thead>
                <tbody>
                  {transactionList.map((tx, index) => (
                    <tr key={index}>
                      <td>
                        <span className={`badge bg-${tx.amount > 0 ? "success" : "danger"}`}>
                          {tx.amount > 0 ? "DEPÓSITO" : "RETIRO"}
                        </span>
                      </td>
                      <td>{tx.date}</td>
                      <td>{tx.amount.toFixed(2)}€</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* COLUMNA DERECHA - OPERACIONES */}
        <Col md={4}>
          <div className="d-flex flex-column gap-3">
            <Card className="bg-warning">
              <Card.Body>
                <Card.Title>Transferencia</Card.Title>
                <Form>
                  <Row className="align-items-center">
                    <Col><Form.Control type="text" placeholder="Nombre y apellidos" value={transferTo} onChange={(e) => setTransferTo(e.target.value)} /></Col>
                    <Col><Form.Control type="number" placeholder="Monto" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} /></Col>
                    <Col xs="auto"><Button variant="dark" onClick={handleTransfer}>→</Button></Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <Card className="bg-success">
              <Card.Body>
                <Card.Title>Solicitar Préstamo</Card.Title>
                <Form>
                  <Row className="align-items-center">
                    <Col><Form.Control type="number" placeholder="Monto" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} /></Col>
                    <Col xs="auto"><Button variant="dark" onClick={handleLoan}>→</Button></Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <Card className="bg-danger">
              <Card.Body>
                <Card.Title>Cerrar Cuenta</Card.Title>
                <Form>
                  <Row className="align-items-center">
                    <Col><Form.Control type="text" placeholder="Nombre y apellidos" value={confirmUser} onChange={(e) => setConfirmUser(e.target.value)} /></Col>
                    <Col><Form.Control type="password" placeholder="PIN" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} /></Col>
                    <Col xs="auto"><Button variant="dark" onClick={handleCloseAccount}>→</Button></Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* ESTADÍSTICAS */}
      <Row className="mt-3">
        <Col md={3}><Card className="text-center"><Card.Body><Card.Title>Ingresos</Card.Title><Card.Text>{totalIn.toFixed(2)}€</Card.Text></Card.Body></Card></Col>
        <Col md={3}><Card className="text-center"><Card.Body><Card.Title>Gastos</Card.Title><Card.Text>{Math.abs(totalOut).toFixed(2)}€</Card.Text></Card.Body></Card></Col>
        <Col md={3}><Card className="text-center"><Card.Body><Card.Title>Intereses</Card.Title><Card.Text>{interest.toFixed(2)}€</Card.Text></Card.Body></Card></Col>
        <Col md={3}><Card className="text-center"><Card.Body><Card.Title>Tiempo Restante</Card.Title><Card.Text>{Math.floor(timeLeft / 60)}:{timeLeft % 60}</Card.Text></Card.Body></Card></Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
