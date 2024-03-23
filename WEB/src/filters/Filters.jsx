import PropTypes from "prop-types";

// Importar componentes
import IngredientFilter from "./IngredientFilter";
import RadioFilter from "./RadioFilter";

// Importar estilos
import "../scss/App.scss";

function Filters({ handleFilter, filterIngredient }) {
  return (
    <form className="filters">
      <label htmlFor="ingredient-filter">
        <IngredientFilter handleFilter={handleFilter} filterIngredient={filterIngredient} />
      </label>

      <label htmlFor="radio-filter">
        <RadioFilter />
      </label>

      {/* Botón de reset
      <button className="filters__reset" type="button">
        <span className="filters__trash-icon">
          <i className="fa-solid fa-trash-can"></i>
        </span>
      </button> */}
    </form>
  );
}

Filters.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filterIngredient: PropTypes.string,
};

Filters.defaultProps = {
  filterIngredient: '', // Valor predeterminado para filterIngredient
};


export default Filters;
