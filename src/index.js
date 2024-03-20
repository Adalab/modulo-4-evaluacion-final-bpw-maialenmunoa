// IMPORTAR BIBLIOTECAS
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2/promise');

// CREAR VARIABLES
const app = express();
const port = 4000;

// CONFIGURACIÓN EXPRESS
app.use(cors());
app.use(express.json({limit: '25Mb'}));

// CONFIGURACIÓN MSYQL
const getConnection = async () => {

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_SCHEMA || 'todo'
  });

  await connection.connect();

  return connection;
};

// ARRANCAR EL SERVIDOR
app.listen(port, () => {
  console.log(`Server has benn started in <http://localhost:${port}>`);
});


// ENDPOINTS