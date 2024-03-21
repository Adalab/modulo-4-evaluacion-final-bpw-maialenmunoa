import PropTypes from "prop-types";

// Importar estilos


function RadioFilter() {
  return (
    <div className="filters__radio">
    <input type="radio" id="sweet" name="type" value="sweet" />
    <label htmlFor="sweet">Dulce</label>
    <input type="radio" id="salty" name="type" value="salty" />
    <label htmlFor="salty">Salado</label>
  </div>
  );
}

RadioFilter.propTypes = {
  /**
   * Filtro de búsqueda por tipo de receta
   */
  onSearch: PropTypes.func,
};

export default RadioFilter;