import { useState } from "react";
import PropTypes from "prop-types";

function CreateRecipe({ handleCreateRecipe }) {
  const [nombre, setNombre] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [instrucciones, setInstrucciones] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("//localhost:3000/api/recetas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          ingredientes,
          instrucciones,
          imagen,
        }),
      });
      const data = await response.json();
      if (data.success) {
        handleCreateRecipe(data.id);
        // Limpiar el formulario después de crear la receta
        setNombre("");
        setIngredientes("");
        setInstrucciones("");
        setImagen("");
      } else {
        console.error("Error al crear la receta:", data.message);
      }
    } catch (error) {
      console.error("Error al crear la receta:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <label>
        Ingredientes:
        <textarea
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
        />
      </label>
      <label>
        Instrucciones:
        <textarea
          value={instrucciones}
          onChange={(e) => setInstrucciones(e.target.value)}
        />
      </label>
      <label>
        Imagen (URL):
        <input
          type="text"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
      </label>
      <button type="submit">Crear Receta</button>
    </form>
  );
}

CreateRecipe.propTypes = {
    handleCreateRecipe: PropTypes.func.isRequired,
};

export default CreateRecipe;