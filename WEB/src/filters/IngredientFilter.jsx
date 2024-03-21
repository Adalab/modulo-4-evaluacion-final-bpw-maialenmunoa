import PropTypes from "prop-types";

// Importar estilos


function IngredientFilter() {
  return (
    <div className="filters__input">
      <input
        type="text"
        id="ingredient-filter"
        placeholder="Buscar por ingrediente..."
      />
    </div>
  );
}

IngredientFilter.propTypes = {
  /**
   * Filtro de búsqueda por ingrediente
   */
  onSearch: PropTypes.func,
};

export default IngredientFilter;
