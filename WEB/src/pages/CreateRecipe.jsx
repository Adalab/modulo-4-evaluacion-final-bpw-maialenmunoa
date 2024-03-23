import { useState } from "react";
import PropTypes from "prop-types";

function CreateRecipe({ handleCreateRecipe }) {
  const [nombre, setNombre] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [instrucciones, setInstrucciones] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let recipe = {
      nombre,
      ingredientes,
      instrucciones,
      imagen,
    };

    // Enviar la receta a App.jsx para que la cree en el servidor
    handleCreateRecipe(recipe);

    // Limpiar el formulario después de crear la receta
    setNombre("");
    setIngredientes("");
    setInstrucciones("");
    setImagen("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Nueva receta</h2>
      <label className="form__label">
        Nombre:
        <input
          className="form__input"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <label className="form__label">
        Ingredientes:
        <textarea
          className="form__textarea"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
        />
      </label>
      <label className="form__label">
        Instrucciones:
        <textarea
          className="form__textarea"
          value={instrucciones}
          onChange={(e) => setInstrucciones(e.target.value)}
        />
      </label>
      <label className="form__label">
        Imagen (URL):
        <input
          className="form__input"
          type="text"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
      </label>
      <button className="form__button" type="submit">
        Crear Receta
      </button>
    </form>
  );
}

CreateRecipe.propTypes = {
  handleCreateRecipe: PropTypes.func.isRequired,
};

export default CreateRecipe;
