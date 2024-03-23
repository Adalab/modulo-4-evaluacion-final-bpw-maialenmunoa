// IMPORTAR BIBLIOTECAS
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const mysql = require("mysql2/promise");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CREAR VARIABLES
const app = express();
const port = 3000;

// CONFIGURACIÓN EXPRESS
app.use(cors());
app.use(express.json({ limit: "25Mb" }));

// CONFIGURACIÓN MSYQL
const getConnection = async (database) => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS,
    database: database || "recetas_db", // Usar recetas_db si no se especifica otra base de datos
  });

  await connection.connect();

  return connection;
};

// ARRANCAR EL SERVIDOR
app.listen(port, () => {
  console.log(`Server has benn started in <http://localhost:${port}>`);
});

// Middleware de autenticación para verificar el token JWT
const authenticateToken = (req, res, next) => {
  // Obtener el token de la cabecera de autorización
  let token = req.headers.authorization;

  // Verificar si se proporcionó un token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token de autenticación no proporcionado",
    });
  }

  // Verificar si el token es válido
  token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Token de autenticación no válido" });
    }

    // Si el token es válido, adjunta el objeto decodificado (contiene información del usuario) al objeto de solicitud
    req.user = decoded;

    // Continuar con la solicitud
    next();
  });
};

// Aplicar el middleware de autenticación a todas las rutas de la API de recetas
app.use("/api/recetas", authenticateToken);

// ENDPOINTS

// GET /api/recetas - Obtener todas las recetas
app.get("/api/recetas", async (req, res) => {
  try {
    const connection = await getConnection();
    const [queryGetRecipe] = await connection.query("SELECT * FROM recetas");
    connection.end(); // Cerrar la conexión

    const numOfElements = queryGetRecipe.length;

    res.json({ info: { count: numOfElements }, results: queryGetRecipe });
  } catch (error) {
    console.error("Error al obtener las recetas:", error);
    res.status(500).json({ success: false, message: "Ha ocurrido un error" });
  }
});

// GET /api/recetas/:id - Obtener una receta por su id
app.get("/api/recetas/:id", async (req, res) => {
  const { id } = req.params; // Obtener el ID de la receta de los parámetros de la URL

  try {
    const connection = await getConnection();
    const [queryGetId] = await connection.query(
      "SELECT * FROM recetas WHERE id = ?",
      [id]
    );
    connection.end(); // Cierra la conexión

    // Comprobar si se encontró la receta
    if (queryGetId.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Oops! Receta no encontrada" });
    }

    const recipe = queryGetId[0]; // Obtener la primera (y única) fila de resultados

    res.json({ success: true, recipe });
  } catch (error) {
    console.error("Error al obtener la receta:", error);
    res.status(500).json({ success: false, message: "Ha ocurrido un error" });
  }
});

// GET /api/recetas/ingrediente/:ingrediente - Obtener una receta por un ingrediente
app.get("/api/recetas/ingrediente/:ingrediente", async (req, res) => {
  const ingrediente = req.params.ingrediente;

  try {
    const connection = await getConnection();
    const [resultsIngredients] = await connection.query(
      "SELECT * FROM recetas WHERE ingredientes LIKE ?",
      [`%${ingrediente}%`]
    );
    connection.end(); // Cierra la conexión

    // Verificar si se encontraron recetas con el ingrediente especificado
    if (resultsIngredients.length > 0) {
      return res.json(results);
    } else {
      return (
        "No se encontraron recetas con el ingrediente especificado"
      );
    }
  } catch (error) {
    console.error("Error al obtener la receta por ingrediente:", error);
    res.status(500).json({
      success: false,
      message: "Ha ocurrido un error",
    });
  }
});

// POST /api/recetas - Crear una nueva receta
app.post("/api/recetas", async (req, res) => {
  const { nombre, ingredientes, instrucciones, imagen } = req.body; // Obtener la información de la receta del body

  try {
    // Verificar si los valores necesarios están definidos
    if (!nombre || !ingredientes || !instrucciones || !imagen) {
      return ("Uno o más campos de la receta no están definidos");
    }

    const connection = await getConnection();
    const [resultNewRecipe] = await connection.execute(
      "INSERT INTO recetas (nombre, ingredientes, instrucciones, imagen) VALUES (?, ?, ?, ?)",
      [nombre, ingredientes, instrucciones, imagen]
    );
    connection.end(); // Cierra la conexión

    // Verificar si la inserción fue exitosa
    if (resultNewRecipe.affectedRows === 1) {
      const nuevo_id = resultNewRecipe.insertId;
      return res.json({ success: true, id: nuevo_id });
    } else {
      return ("No se pudo crear la receta");
    }
  } catch (error) {
    console.error("Error al crear la receta:", error);
    res.status(500).json({ success: false, message: "Ha ocurrido un error" });
  }
});

// PUT /api/recetas/:id - Actualizar una receta existente por su id
app.put("/api/recetas/:id", async (req, res) => {
  const recetaId = req.params.id;
  const { nombre, ingredientes, instrucciones, imagen } = req.body;

  try {
    // Verificar si los valores necesarios están definidos
    if (!nombre || !ingredientes || !instrucciones || !imagen) {
      return ("Uno o más campos de la receta no están definidos");
    }

    const connection = await getConnection();
    const [resultEditeRecipe] = await connection.execute(
      "UPDATE recetas SET nombre = ?, ingredientes = ?, instrucciones = ?, imagen = ? WHERE id = ?",
      [nombre, ingredientes, instrucciones, imagen, recetaId]
    );
    5;
    connection.end(); // Cierra la conexión

    // Verificar si la actualización fue exitosa
    if (resultEditeRecipe.affectedRows === 1) {
      return res.json({ success: true });
    } else {
      return ("No se pudo actualizar la receta");
    }
  } catch (error) {
    console.error("Error al actualizar la receta:", error);
    res.status(500).json({ success: false, message: "Ha ocurrido un error" });
  }
});

// DELETE /api/recetas/:id - Eliminar una receta por su id
app.delete("/api/recetas/:id", async (req, res) => {
  const recetaId = req.params.id;

  try {
    const connection = await getConnection();
    const [resultDeleteRecipe] = await connection.execute(
      "DELETE FROM recetas WHERE id = ?",
      [recetaId]
    );
    connection.end(); // Cierra la conexión

    // Verificar si la eliminación fue exitosa
    if (resultDeleteRecipe.affectedRows === 1) {
      return res.json({ success: true });
    } else {
      return ("No se pudo eliminar la receta");
    }
  } catch (error) {
    console.error("Error al eliminar la receta:", error);
    res.status(500).json({ success: false, message: "Ha ocurrido un error" });
  }
});

//POST /registro - Crear un nuevo usuario en la base de datos
app.post("/registro", async (req, res) => {
  const { email, nombre, password } = req.body;

  try {
    // Verificar si los campos requeridos están presentes
    if (!email || !nombre || !password) {
      return ("El email, nombre y contraseña son obligatorios");
    }

    // Verificar si el email ya existe en la base de datos
    const connection = await getConnection("usuarios_db");
    const [existingUsers] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    connection.end();

    if (existingUsers.length > 0) {
      return ("Este email ya está registrado");
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos
    const insertUserQuery =
      "INSERT INTO usuarios (email, nombre, password) VALUES (?, ?, ?)";
    const insertUserParams = [email, nombre, hashedPassword];

    const insertUserConnection = await getConnection("usuarios_db");
    await insertUserConnection.execute(insertUserQuery, insertUserParams);
    insertUserConnection.end();

    // Crear y devolver el token JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//POST /login - Iniciar sesión
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si los campos obligatorios están presentes
    if (!email || !password) {
      return ("El email y la contraseña son obligatorios");
    }

    // Buscar al usuario en la base de datos usuarios_db
    const connection = await getConnection("usuarios_db");
    const [users] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    connection.end();

    // Verificar si se encontró un usuario con el email proporcionado
    if (users.length === 0) {
      return ("El email es incorrecto");
    }

    const user = users[0]; // Obtener el primer email encontrado

    // Verificar si la contraseña coincide
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return ("La contraseña es incorrecta");
    }

    // Crear y devolver el token JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(401).json({ success: false, error: error.message });
  }
});

// DEFINIR SERVIDORES ESTÁTICOS

const staticServerPathWeb = "../public";
app.use(express.static(staticServerPathWeb));
