

// Importar componentes
import IngredientFilter from "./IngredientFilter";
import RadioFilter from "./RadioFilter";

// Importar estilos
import "../scss/App.scss";

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
      <button className="filters__reset" type="button">
        <span className="filters__trash-icon">
          <i className="fa-solid fa-trash-can"></i>
        </span>
      </button>
    </form>
  );
}

export default Filters;
