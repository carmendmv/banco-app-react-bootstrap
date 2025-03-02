import { fakerES as faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

// Función para generar cuentas aleatorias y guardarlas en un JSON
const generateAccounts = (num) => {
  const accounts = Array.from({ length: num }, (_, i) => {
    const fullName = faker.person.fullName();
    const pin = faker.number.int({ min: 1000, max: 9999 });
    
    const username = fullName
      .split(" ")
      .map(word => word[0])
      .join("")
      .toLowerCase() + pin;

    return {
      id: i + 1,
      fullName,
      username,
      pin,
      balance: faker.finance.amount(100, 5000, 2),
      movements: [],
      createdAt: new Date().toISOString()
    };
  });

  const filePath = path.join(__dirname, "accounts.json");
  try {
    fs.writeFileSync(filePath, JSON.stringify(accounts, null, 2), "utf-8");
    console.log("Cuentas generadas y guardadas en accounts.json");
  } catch (error) {
    console.error("Error al guardar las cuentas:", error);
  }

  return accounts;
};

export default generateAccounts;