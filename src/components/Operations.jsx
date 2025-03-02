import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import moment from "moment";

// Componente de mensaje con desaparición automática
export default function Message({ message, setMessage }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return message ? <Alert variant="info">{message}</Alert> : null;
}

// Función para formatear fechas en formato relativo
const formatRelativeDate = (date) => {
  return moment(date).fromNow();
};

export const handleTransfer = (transferTo, transferAmount, user, accounts, setAccounts, setBalance, setTransactions, setMessage) => {
  const amount = parseFloat(transferAmount);
  if (!transferTo || isNaN(amount) || amount <= 0 || amount > user.balance) {
      setMessage("Transferencia inválida. Verifica los datos.");
      setTimeout(() => setMessage(null), 5000);
      return;
  }

  const recipientIndex = accounts.findIndex(acc => acc.owner.toLowerCase() === transferTo.toLowerCase());
  if (recipientIndex === -1) {
      setMessage("La cuenta de destino no existe.");
      setTimeout(() => setMessage(null), 5000);
      return;
  }

  const updatedAccounts = [...accounts];
  updatedAccounts[recipientIndex].balance += amount;
  setAccounts(updatedAccounts);
  setBalance(prev => prev - amount);
  setTransactions(prev => {
    const newTransactions = [...prev, { type: "WITHDRAWAL", date: new Date().toISOString(), amount: -amount }];
    return newTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha descendente
  });
  setMessage(`Transferencia de ${amount.toFixed(2)}€ realizada con éxito a ${accounts[recipientIndex].owner}.`);
  setTimeout(() => setMessage(null), 5000);
};

export const handleLoan = (loanAmount, user, setBalance, setTransactions, setMessage) => {
  const amount = parseFloat(loanAmount);
  if (isNaN(amount) || amount <= 0 || amount > user.balance * 2) {
      setMessage("Préstamo no permitido. Verifica el monto.");
      setTimeout(() => setMessage(null), 5000);
      return;
  }

  setBalance(prev => prev + amount);
  setTransactions(prev => {
    const newTransactions = [...prev, { type: "DEPOSIT", date: new Date().toISOString(), amount }];
    return newTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  });
  setMessage("Préstamo aprobado y depositado en su cuenta.");
  setTimeout(() => setMessage(null), 5000);
};

export const handleCloseAccount = (confirmUser, confirmPin, user, accounts, setAccounts, setUser, setMessage) => {
  if (confirmUser === user.owner && confirmPin === user.pin.toString()) {
      if (window.confirm("¿Está seguro de que desea eliminar su cuenta? Esta acción es irreversible.")) {
          setAccounts(accounts.filter(acc => acc.owner !== user.owner));
          setUser(null);
          setMessage("Su cuenta ha sido eliminada permanentemente.");
          setTimeout(() => setMessage(null), 5000);
      }
  } else {
      setMessage("Nombre de usuario o PIN incorrectos.");
      setTimeout(() => setMessage(null), 5000);
  }
};
