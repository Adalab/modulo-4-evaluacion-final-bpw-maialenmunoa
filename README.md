# Recetas API Server

Proyecto de creación de un servidor API RESTful para gestionar recetas de cocina. Proporciona endpoints para crear, ver, actualizar y eliminar recetas, así como para registrarse e iniciar sesión como usuaria.

El servidor está implementado utilizando Node.js y Express, y se conecta a una base de datos MySQL para almacenar y recuperar la información de las recetas y los usuarios. Además, utiliza JSON Web Tokens (JWT) para autenticar a las usuarias en las solicitudes a la API.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript en el servidor.
- **Express**: Marco de aplicación web de Node.js para crear API RESTful.
- **MySQL**: Sistema de gestión de bases de datos relacional para almacenar información de recetas y usuarios.
- **bcrypt**: Biblioteca para el hash y la comparación segura de contraseñas.
- **JSON Web Tokens (JWT)**: Mecanismo para autenticar solicitudes a la API mediante tokens.
- **dotenv**: Módulo para cargar variables de entorno desde un archivo `.env`.

## Instalación

1. Clona este repositorio: 
```bash
https://github.com/Adalab/modulo-4-evaluacion-final-bpw-maialenmunoa.git
```
2. Instala las dependencias utilizando npm:

```bash
npm install
```

3. Crea un archivo `.env` en el directorio raíz del proyecto y configura las siguientes variables de entorno:

```plaintext
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASS=tu_contraseña
JWT_SECRET=secreto_para_generar_jwt
```

4. Inicia el servidor ejecutando el siguiente comando:

```bash
npm start
```

¡Listo! La API estará funcionando en [http://localhost:3000](http://localhost:3000)

## Endpoints

### Obtener todas las recetas

```plaintext
GET /api/recetas
```

Este endpoint devuelve todas las recetas almacenadas en la base de datos.

### Obtener una receta por su ID

```plaintext
GET /api/recetas/:id
```

Este endpoint devuelve una receta específica según su ID.

### Obtener una receta por un ingrediente

```plaintext
GET /api/recetas/ingrediente/:ingrediente
```

Este endpoint devuelve todas las recetas que contienen el ingrediente especificado.

### Crear una nueva receta

```plaintext
POST /api/recetas
```

Este endpoint permite crear una nueva receta enviando los datos de la receta en el cuerpo de la solicitud.

### Actualizar una receta existente por su ID

```plaintext
PUT /api/recetas/:id
```

Este endpoint permite actualizar una receta existente según su ID, proporcionando los nuevos datos de la receta en el cuerpo de la solicitud.

### Eliminar una receta por su ID

```plaintext
DELETE /api/recetas/:id
```

Este endpoint permite eliminar una receta existente según su ID.

### Registro de usuario

```plaintext
POST /registro
```

Este endpoint permite registrar una nueva usuaria proporcionando su correo electrónico, nombre y contraseña.

### Iniciar sesión

```plaintext
POST /login
```

Este endpoint permite que una usuaria inicie sesión proporcionando su correo electrónico y contraseña.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commits (`git commit -am 'Agrega una nueva funcionalidad'`).
4. Sube tus cambios al repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Autoría 👩‍💻

[Maialen Muñoa](https://github.com/maialenmunoa)
