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
      .json({ success: false, message: "Ha ocurrido un error" });
  }
});


// GET /api/recetas/:id - Obtener una receta por su id
app.get("/api/recetas/:id", async (req, res) => {
  const { id } = req.params; // Obtener el ID de la receta de los parámetros de la URL

  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM recetas WHERE id = ?",
      [id]
    );
    connection.end(); // Cierra la conexión

    // Comprobar si se encontró la receta
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Receta no encontrada" });
    }

    const recipe = rows[0]; // Obtener la primera (y única) fila de resultados

    res.json({ success: true, recipe });
  } catch (error) {
    console.error("Error al obtener la receta:", error);
    res
      .status(500)
      .json({ success: false, message: "Ha ocurrido un error" });
  }
});


// GET /api/recetas/ingrediente/:ingrediente - Obtener una receta por un ingrediente
app.get("/api/recetas/ingrediente/:ingrediente", async (req, res) => {
  const ingrediente = req.params.ingrediente;

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(
      "SELECT * FROM recetas WHERE ingredientes LIKE ?",
      [`%${ingrediente}%`]
    );
    connection.end(); // Cierra la conexión

    // Verificar si se encontraron recetas con el ingrediente especificado
    if (results.length > 0) {
      return res.json(results);
    } else {
      throw new Error(
        "No se encontraron recetas con el ingrediente especificado"
      );
    }
  } catch (error) {
    console.error("Error al obtener la receta por ingrediente:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Ha ocurrido un error",
      });
  }
});


// POST /api/recetas - Crear una nueva receta
app.post("/api/recetas", async (req, res) => {
  const { nombre, ingredientes, instrucciones } = req.body; // Obtener la información de la receta del body

  try {
    // Verificar si los valores necesarios están definidos
    if (!nombre || !ingredientes || !instrucciones) {
      throw new Error("Uno o más campos de la receta no están definidos");
    }

    const connection = await getConnection();
    const [result] = await connection.execute(
      "INSERT INTO recetas (nombre, ingredientes, instrucciones) VALUES (?, ?, ?)",
      [nombre, ingredientes, instrucciones]
    );
    connection.end(); // Cierra la conexión

    // Verificar si la inserción fue exitosa
    if (result.affectedRows === 1) {
      const nuevo_id = result.insertId;
      return res.json({ success: true, id: nuevo_id });
    } else {
      throw new Error("No se pudo crear la receta");
    }
  } catch (error) {
    console.error("Error al crear la receta:", error);
    res
      .status(500)
      .json({ success: false, message: "Ha ocurrido un error" });
  }
});


// PUT /api/recetas/:id - Actualizar una receta existente por su id
app.put("/api/recetas/:id", async (req, res) => {
  const recetaId = req.params.id;
  const { nombre, ingredientes, instrucciones } = req.body;

  try {
    // Verificar si los valores necesarios están definidos
    if (!nombre || !ingredientes || !instrucciones) {
      throw new Error("Uno o más campos de la receta no están definidos");
    }

    const connection = await getConnection();
    const [result] = await connection.execute(
      "UPDATE recetas SET nombre = ?, ingredientes = ?, instrucciones = ? WHERE id = ?",
      [nombre, ingredientes, instrucciones, recetaId]
    );
    connection.end(); // Cierra la conexión

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 1) {
      return res.json({ success: true });
    } else {
      throw new Error("No se pudo actualizar la receta");
    }
  } catch (error) {
    console.error("Error al actualizar la receta:", error);
    res
      .status(500)
      .json({ success: false, message: "Ha ocurrido un error" });
  }
});


// DELETE /api/recetas/:id - Eliminar una receta por su id
app.delete("/api/recetas/:id", async (req, res) => {
  const recetaId = req.params.id;

  try {
    const connection = await getConnection();
    const [result] = await connection.execute(
      "DELETE FROM recetas WHERE id = ?",
      [recetaId]
    );
    connection.end(); // Cierra la conexión

    // Verificar si la eliminación fue exitosa
    if (result.affectedRows === 1) {
      return res.json({ success: true });
    } else {
      throw new Error("No se pudo eliminar la receta");
    }
  } catch (error) {
    console.error("Error al eliminar la receta:", error);
    res
      .status(500)
      .json({ success: false, message: "Ha ocurrido un error" });
  }
});
