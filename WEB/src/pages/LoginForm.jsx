import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        // Almacenar el token en el almacenamiento local
        localStorage.setItem("token", token);
        // Llamar a la función setToken para pasar el token al componente principal
        setToken(token);
      } else {
        const errorData = await response.json();
        setError(errorData.error); // Mostrar el mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Iniciar sesión</h2>
        {error && <div className="error">{error}</div>}
        <div>
          <label className="form__label" htmlFor="email">
            Email:
          </label>
          <input
            className="form__input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form__label" htmlFor="password">
            Contraseña:
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="form__button" type="submit">
          Iniciar sesión
        </button>
      </form>
      <Link to="/register">
      <button className="form__register-btn" type="submit">
        REGÍSTRATE
      </button>
      </Link>
    </>
  );
};

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginForm;
