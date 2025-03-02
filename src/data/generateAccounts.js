import { fakerES as faker } from "@faker-js/faker"; // Uso la librería Faker para generar datos aleatorios en español
import fs from "fs"; // Necesito fs para escribir archivos en el sistema
import path from "path"; // Uso path para manejar rutas de archivos de manera más segura

// creo una función que me permita generar varias cuentas de manera automática
const generateAccounts = (num) => {
  return Array.from({ length: num }, (_, i) => {
    const fullName = faker.person.fullName(); // Genero un nombre completo en castellano
    const pin = faker.number.int({ min: 1000, max: 9999 }); // Creo un PIN aleatorio de 4 dígitos

    // Para los nombres de usuario, decidí tomar la primera letra del nombre y el apellido seguido del PIN
    const username = fullName
      .split(" ") // Separo el nombre completo en palabras individuales
      .map(word => word[0]) // Extraigo la primera letra de cada palabra
      .join("")
      .toLowerCase() + pin; // Lo convierto a minúsculas y agrego el PIN

    return {
      id: i + 1, // Asigno un ID único a cada cuenta
      owner: fullName, // Guardo el nombre completo del usuario
      username, // Almaceno el nombre de usuario generado
      pin, // Guardo el PIN asociado a la cuenta
    };
  });
};

// Genero 10 cuentas aleatorias con la función que creé
const accounts = generateAccounts(10);

// Para poder guardar estos datos y consultarlos fácilmente más tarde, decidí escribirlos en un archivo JSON
const filePath = path.join(__dirname, "accounts.json"); 

fs.writeFileSync(
  filePath, // La ruta del archivo donde quiero guardar los datos
  JSON.stringify(accounts, null, 2), // Convierto el array de objetos en un formato JSON legible
  "utf-8" // Especifico la codificación para evitar problemas con caracteres especiales
);

/*
¿Por qué he usado fs.writeFileSync?
- Necesitaba guardar las cuentas generadas en un archivo para poder acceder a ellas después.
- Esta función escribe directamente el contenido en `accounts.json`.
- Si el archivo ya existía, lo sobrescribe con nuevas cuentas.
- He usado "utf-8" para asegurarme de que los caracteres se guarden correctamente.
- Para generar el archivo JSON, escribo por terminal: node src/data/generateAccounts.js
*/

export default accounts;



