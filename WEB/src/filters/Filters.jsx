import PropTypes from "prop-types";

// Importar componentes
import IngredientFilter from "./IngredientFilter";
import RadioFilter from "./RadioFilter";

// Importar estilos


function Filters() {
  return (
    <form className="filters">
      <label htmlFor="ingredient-filter">
        <IngredientFilter />
      </label>

      <label htmlFor="ingredient-filter">
        <RadioFilter />
      </label>

      {/* Botón de reset */}
      <button className="form__reset" type="button">
        <span className="form__trash-icon">
          <i className="fa-solid fa-trash-can"></i>
        </span>
      </button>
    </form>
  );
}

export default Filters;
