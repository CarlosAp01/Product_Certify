# 🏗 Product Certify - Sistema de Certificación Blockchain

**Product Certify** es una aplicación descentralizada (DApp) diseñada para garantizar la autenticidad y calidad de productos mediante el uso de la tecnología blockchain. Los fabricantes pueden registrar sus productos y, tras superar un proceso de evaluación técnica, obtener un **Certificado de Autenticidad en formato NFT (ERC-721)**.

---

## 📄 Información del Contrato (Sepolia)

- **Dirección del Contrato**: `0xec22efAF3A052827d302d24108ff3Bfc28745150`
- **Etherscan**: [Ver en Etherscan Sepolia](https://sepolia.etherscan.io/address/0xec22efAF3A052827d302d24108ff3Bfc28745150#code)
- **Vercel**: [Ver en Vercel](https://product-certify-nextjs.vercel.app/)

---

## 📸 Guía de Funcionamiento

### 1. Panel de Control (Dashboard)
Aquí es donde comienza la interacción del usuario. El panel ofrece una visión general de la aplicación y permite conectar la billetera (MetaMask) para empezar a gestionar productos.

> **<img width="1211" height="626" alt="Pagina inicial" src="https://github.com/user-attachments/assets/9f6c6982-6c98-414c-a55d-ff90f684e72e" />**

> *Muestra la interfaz inicial y el botón de conexión de billetera.*

> **<img width="1200" height="374" alt="Inicial Pag" src="https://github.com/user-attachments/assets/a1f7ba1c-e5b8-4e0b-ba06-2170ac1fd32e" />**

---

### 2. Registro de Productos
En esta sección, los usuarios o fabricantes pueden ingresar los datos técnicos de sus productos. El contrato inteligente almacena de forma segura el nombre, fabricante, año, modelo y número de serie.

> **<img width="513" height="509" alt="Registro producto" src="https://github.com/user-attachments/assets/8ca35854-8fb9-4951-8de1-b01914fd2e32" />**

> *Muestra los campos de entrada: Nombre del Producto, Fabricante, Año, etc.*

**Funcionamiento Técnico:** Se utiliza la función `registerProduct` del contrato para crear una entrada única vinculada a la dirección de la billetera del usuario.

---

### 3. Cuestionario de Calidad y Certificación
Para obtener un certificado oficial, el producto debe pasar por una evaluación. Si el usuario responde correctamente al cuestionario y obtiene un **puntaje mayor o igual a 60**, el sistema habilita la generación del NFT.

> **<img width="1199" height="619" alt="Certificar producto" src="https://github.com/user-attachments/assets/e170a596-f085-4ab0-bc06-f09b99fe17ec" />**

> *Muestra la lista de productos registrados y el botón para iniciar la certificación.*

**Regla de Negocio:** 
- `score >= 60`: Aprobado para certificación.
- `score < 60`: Certificación denegada por insuficiente calidad.

---

### 4. Certificados NFT (ERC-721)
Una vez aprobado el cuestionario, se emite un NFT único que actúa como el certificado digital del producto. Este NFT contiene el número de serie y es inmutable, lo que permite verificar la propiedad y autenticidad en cualquier explorador de bloques.

> **<img width="1211" height="620" alt="Generacion de NFT" src="https://github.com/user-attachments/assets/697aefa3-c2f4-4935-9cb4-530e3de48e3b" />**

> *Muestra la confirmación del NFT generado y los detalles del certificado.*

---
---
### 5. Pruebas de transacciones
Son los resultados de unas pruebas hechas en la red de Sepolia
> **<img width="352" height="524" alt="Metamask de prueba" src="https://github.com/user-attachments/assets/17485b60-ff21-44d4-a21f-683a93f1c746" />**

> *Costo de cada transaccion*

> **<img width="355" height="571" alt="NFT generado" src="https://github.com/user-attachments/assets/e25522c1-2eb4-4d80-821c-da6ad735f0ad" />**

> *NFT almacenado en la wallet del usuario*
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
