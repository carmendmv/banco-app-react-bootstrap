import { fakerES as faker } from "@faker-js/faker";
import fs from "fs";

const generateAccounts = (num) => {
  return Array.from({ length: num }, (_, i) => {
    const fullName = faker.person.fullName();
    const pin = faker.number.int({ min: 1000, max: 9999 });
    const username = fullName
      .split(" ")
      .map(word => word[0])
      .join("")
      .toLowerCase(); 

    return {
      id: i + 1,
      owner: fullName,
      username,
      pin,
    };
  });
};

const accounts = generateAccounts(10);

// Guardar las cuentas en un archivo JSON
fs.writeFileSync("./src/data/accounts.json", JSON.stringify(accounts, null, 2));

console.log("✅ Archivo accounts.json generado correctamente.");


