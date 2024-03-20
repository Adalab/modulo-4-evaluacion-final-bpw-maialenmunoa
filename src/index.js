// IMPORTAR BIBLIOTECAS
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql2/promise");

// CREAR VARIABLES
const app = express();
const port = 3000;

// CONFIGURACIÓN EXPRESS
app.use(cors());
app.use(express.json({ limit: "25Mb" }));

// CONFIGURACIÓN MSYQL
const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_SCHEMA || "recetas_db",
  });

  await connection.connect();

  return connection;
};

// ARRANCAR EL SERVIDOR
app.listen(port, () => {
  console.log(`Server has benn started in <http://localhost:${port}>`);
});

// ENDPOINTS

// GET /api/recetas - Obtener todas las recetas
app.get("/api/recetas", async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT * FROM recetas");
    connection.end(); // Cerrar la conexión

    const numOfElements = rows.length;

    res.json({ info: { count: numOfElements }, results: rows });
  } catch (error) {
    console.error("Error al obtener las recetas:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener las recetas" });
  }
});

// GET /api/recetas/:id - Obtener una receta por su id
// POST /api/recetas - Crear una nueva receta
// PUT /api/recetas/:id - Actualizar una receta existente por su id
// DELETE /api/recetas/:id - Eliminar una receta por su id
