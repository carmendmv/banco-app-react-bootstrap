import React from "react";
import { Container } from "react-bootstrap";

function Welcome({ user }) {
  return (
    <Container className="mt-5 text-center">
      {/* Verifico si `user` existe antes de mostrar su nombre completo */}
      <h2>Bienvenido, {user?.owner}</h2>
      <p>Accede a tu cuenta para gestionar tus operaciones bancarias.</p>
    </Container>
  );
}

export default Welcome;
