## Comandos Necesarios y sus Funciones

A continuación se muestra una lista de comandos que se deben ejecutar para configurar y utilizar el proyecto, junto con una breve explicación de cada uno:

1. **Crear el proyecto con Vite y React**  
   ```bash
   npm create vite@latest banco-app-react-bootstrap --template react

    Función: Crea un nuevo proyecto llamado banco-app-react-bootstrap utilizando Vite con la plantilla de React.

 2.   **Instalar React-Bootstrap y Bootstrap**
   ```bash
   npm install react-bootstrap bootstrap
   
    Función: Instala react-bootstrap (componentes de Bootstrap adaptados para React) y bootstrap (framework CSS) para el diseño de la interfaz.

3. **Instalar date-fns**
   ```bash
   npm install date-fns

    Función: Instala date-fns, una librería para la manipulación y formateo de fechas en JavaScript.
    Nota: Se utiliza date-fns en lugar de moment.

4. **Instalar @faker-js/faker**
   ```bash
   npm install @faker-js/faker

    Función: Instala la librería @faker-js/faker para generar datos falsos (fake data), útil para pruebas y para generar datos aleatorios en el proyecto.

5. **Instalar versiones específicas de React y React-DOM**
   ```bash
   npm install react@^19.0.0 react-dom@^19.0.0

    Función: Instala react y react-dom en versiones específicas (a partir de la versión 19.0.0) para asegurar la compatibilidad con el proyecto.

6. **Instalar dependencias de desarrollo (ESLint, TypeScript types, Vite plugin, etc.)**
   ```bash
   npm install --save-dev @eslint/js@^9.19.0 @types/react@^19.0.8 @types/react-dom@^19.0.3 @vitejs/plugin-react@^4.3.4 eslint@^9.19.0 eslint-plugin-react@^7.37.4 eslint-plugin-react-hooks@^5.0.0 eslint-plugin-react-refresh@^0.4.18 globals@^15.14.0 vite@^6.1.0

    Función:
        ESLint y sus plugins: Analiza el código para detectar errores y mantener buenas prácticas.
        TypeScript types para React y React-DOM: Facilitan el desarrollo en TypeScript.
        @vitejs/plugin-react y Vite: Mejoran la experiencia de desarrollo con React y optimizan el rendimiento.

7. **Instalar React Bootstrap Icons**
   ```bash
   npm install react-bootstrap-icons

    Función: Instala un conjunto de iconos optimizados para React basados en Bootstrap Icons, facilitando la incorporación de iconografía en la interfaz.

8. **Para generar el archivo JSON con las cuentas aleatoria:**
   ```bash
   node src/data/generateAccounts.js

    Función: Ejecuta el script generateAccounts.js ubicado en src/data/ para generar un archivo JSON que contiene datos aleatorios de cuentas bancarias.

9. **Actualizar Node.js (opcional)**

    Instalar nvm y actualizar **Node.js a la versión 20**:
       ```bash
        curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
        source ~/.bashrc
        nvm install 20

        Función:
            Descarga e instala nvm (Node Version Manager) para gestionar versiones de Node.js.
            Recarga la configuración del shell con source ~/.bashrc para que se reconozca nvm.
            Instala la versión 20 de Node.js para asegurar que se utiliza una versión actualizada y compatible con el proyecto.

## Funcionalidades Implementadas

### 1. Cerrar Cuenta

- Permite al usuario **cerrar su cuenta**, eliminándola de las cuentas disponibles.
- Una vez cerrada, el usuario **no podrá acceder** a dicha cuenta.
- La cuenta cerrada desaparece del sistema.

### 1.1 Cerrar Sesión

- Permite al usuario **cerrar sesión**, devolviendole a la página de login, sin necesidad de eliminar la cuenta.
- La cuenta cerrada permanecerá en el sistema

### 2. Transferencias de Dinero

- Permite realizar **transferencias entre cuentas**.
- Validaciones:
  - Las cuentas de origen y destino deben existir y ser válidas.
  - La cuenta de origen debe tener **suficiente saldo**.
  - El monto a transferir debe ser **positivo**.
- Al cumplirse las condiciones, se actualizan los saldos de ambas cuentas.

### 3. Solicitar Préstamo

- Permite a los usuarios **solicitar un préstamo**.
- Restricciones:
  - La cantidad solicitada debe ser **positiva**.
  - La cantidad no puede ser **superior al 200%** del saldo de la cuenta.
- Si se aprueba la solicitud, el saldo de la cuenta se actualiza con el monto del préstamo.

### 4. Movimientos Bancarios

- Cada movimiento se registra como un **objeto** que incluye:
  - El **importe** de la operación (positivo o negativo).
  - La **fecha** en que se realizó la transacción.
- Los movimientos pueden ser **ordenados por fecha** para una visualización más clara.

### 5. Generación de Datos Aleatorios

- Permite la creación de datos ficticios para simular cuentas y transacciones.
- La generación de datos puede realizarse utilizando:
  - La librería **[Faker.js](https://fakerjs.dev/)**.
  - Una función personalizada en el código.

### 6. Manejo de Fechas

- Las fechas se muestran en un formato **relativo** (por ejemplo, "hace 2 días").
- Se utiliza la librería **date-fns** para formatear y mostrar las fechas de manera amigable.

