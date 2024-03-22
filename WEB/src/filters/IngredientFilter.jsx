import PropTypes from "prop-types";

// Importar estilos


function IngredientFilter({handleFilter, filterIngredient}) {

  const handleInputIngredient = (event) => {
    handleFilter('ingredient', event.currentTarget.value);
  };

  return (
    <div>
      <input className="filters__input"
        type="text"
        id="ingredient-filter"
        onInput={handleInputIngredient} 
        value={filterIngredient}
        placeholder="Buscar por ingrediente..."
      />
    </div>
  );
}

IngredientFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filterIngredient: PropTypes.string.isRequired,
};

export default IngredientFilter;
