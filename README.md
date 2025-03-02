# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


-npm create vite@latest banco-app-react-bootstrap --template react
-npm install react-bootstrap bootstrap
-npm install moment
-npm install @faker-js/faker
-npm install react@^19.0.0 react-dom@^19.0.0
   63  npm install --save-dev @eslint/js@^9.19.0 @types/react@^19.0.8 @types/react-dom@^19.0.3 @vitejs/plugin-react@^4.3.4 eslint@^9.19.0 eslint-plugin-react@^7.37.4 eslint-plugin-react-hooks@^5.0.0 eslint-plugin-react-refresh@^0.4.18 globals@^15.14.0 vite@^6.1.0
-npm install react-bootstrap-icons
- Para generar el archivo JSON con las cuentas aleatorias, escribo por terminal: node src/data/generateAccounts.js