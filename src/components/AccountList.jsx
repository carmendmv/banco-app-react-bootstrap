import React from "react";
import accounts from "../data/accounts";

const AccountList = () => {
  console.log(accounts); // Esto imprimirá las cuentas en la consola
  return (
    <div>
      <h2>Lista de Cuentas</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {account.owner} - PIN: {account.pin}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
