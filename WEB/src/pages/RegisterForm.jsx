import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function RegisterForm({token}) {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [serverResponse, setServerResponse] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = {};

    if (formData.email === "") {
      error.email = "El email es obligatorio";
    }
    if (formData.password === "") {
      error.password = "La contraseña es obligatoria";
    }

    if (Object.keys(error).length > 0) {
      setErrors(error);
    } else {
      try {
        const response = await fetch("//localhost:3000/registro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        const dataResponse = await response.json();
        setServerResponse(dataResponse);

        if (dataResponse.success) {
            // Redirigir al usuario a la página de inicio de sesión
            history.push("/login");
          }
        } catch (error) {
          console.error("Error al enviar datos de registro:", error);
        }
      }
    };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Alta nueva usuaria</h2>
      <div>
        <label className="form__label" htmlFor="name">
          Nombre:
        </label>
        <input
          className="form__input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form__label" htmlFor="email">
          Email:
        </label>
        <input
          className="form__input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label className="form__label" htmlFor="password">
          Contraseña:
        </label>
        <input
          className="form__input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>

      {serverResponse && serverResponse.success === false && (
        <p className="text--error">{serverResponse.error}</p>
      )}

      {serverResponse && serverResponse.success === true && (
        <p>
          Te has registrado correctamente. Puedes acceder desde la{" "}
          <Link to="/login">página del login</Link>
        </p>
      )}

      <button className="form__button" type="submit">
        Crear cuenta
      </button>
      <Link className="form__register-btn" to="/">
        Volver
      </Link>
    </form>
  );
}

RegisterForm.propTypes = {
  token: PropTypes.string,
};

export default RegisterForm;
