# 🏗 Product Certify - Sistema de Certificación Blockchain

**Product Certify** es una aplicación descentralizada (DApp) diseñada para garantizar la autenticidad y calidad de productos mediante el uso de la tecnología blockchain. Los fabricantes pueden registrar sus productos y, tras superar un proceso de evaluación técnica, obtener un **Certificado de Autenticidad en formato NFT (ERC-721)**.

---

## 📄 Información del Contrato (Sepolia)

- **Dirección del Contrato**: `0xec22efAF3A052827d302d24108ff3Bfc28745150`
- **Etherscan**: [Ver en Etherscan Sepolia](https://sepolia.etherscan.io/address/0xec22efAF3A052827d302d24108ff3Bfc28745150#code)

---

## 📸 Guía de Funcionamiento

### 1. Panel de Control (Dashboard)
Aquí es donde comienza la interacción del usuario. El panel ofrece una visión general de la aplicación y permite conectar la billetera (MetaMask) para empezar a gestionar productos.

> **[ ESPACIO PARA CAPTURA DE PANTALLA: PÁGINA PRINCIPAL / DASHBOARD ]**
> *Muestra la interfaz inicial y el botón de conexión de billetera.*

---

### 2. Registro de Productos
En esta sección, los usuarios o fabricantes pueden ingresar los datos técnicos de sus productos. El contrato inteligente almacena de forma segura el nombre, fabricante, año, modelo y número de serie.

> **[ ESPACIO PARA CAPTURA DE PANTALLA: FORMULARIO DE REGISTRO ]**
> *Muestra los campos de entrada: Nombre del Producto, Fabricante, Año, etc.*

**Funcionamiento Técnico:** Se utiliza la función `registerProduct` del contrato para crear una entrada única vinculada a la dirección de la billetera del usuario.

---

### 3. Cuestionario de Calidad y Certificación
Para obtener un certificado oficial, el producto debe pasar por una evaluación. Si el usuario responde correctamente al cuestionario y obtiene un **puntaje mayor o igual a 60**, el sistema habilita la generación del NFT.

> **[ ESPACIO PARA CAPTURA DE PANTALLA: SECCIÓN DE CUESTIONARIO O LISTA DE PRODUCTOS ]**
> *Muestra la lista de productos registrados y el botón para iniciar la certificación.*

**Regla de Negocio:** 
- `score >= 60`: Aprobado para certificación.
- `score < 60`: Certificación denegada por insuficiente calidad.

---

### 4. Certificados NFT (ERC-721)
Una vez aprobado el cuestionario, se emite un NFT único que actúa como el certificado digital del producto. Este NFT contiene el número de serie y es inmutable, lo que permite verificar la propiedad y autenticidad en cualquier explorador de bloques.

> **[ ESPACIO PARA CAPTURA DE PANTALLA: NFT CREADO / ÉXITO DE MINT ]**
> *Muestra la confirmación del NFT generado y los detalles del certificado.*

---

## 🛠 Stack Tecnológico

- **Contratos Inteligentes**: Solidity (v0.8.17) utilizando estándares de **OpenZeppelin (ERC-721)**.
- **Frontend**: Next.js con TypeScript, Tailwind CSS y componentes de **Scaffold-ETH 2**.
- **Web3**: Wagmi & Viem para la interacción con contratos y RainbowKit para la gestión de billeteras.
- **Red de Despliegue**: Sepolia Testnet (Verificado en Etherscan).

---

## 🚀 Instalación y Ejecución Local

Si deseas probar el proyecto en tu entorno local:

1. **Instala las dependencias:**
   ```bash
   yarn install
   ```

2. **Inicia tu red local:**
   ```bash
   yarn chain
   ```

3. **Despliega los contratos:**
   ```bash
   yarn deploy
   ```

4. **Inicia la aplicación frontend:**
   ```bash
   yarn start
   ```

Visita `http://localhost:3000` para ver tu App en acción.
