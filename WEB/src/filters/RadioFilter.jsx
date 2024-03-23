import PropTypes from "prop-types";

// Importar estilos

function RadioFilter() {
  return (
    <div className="filters__radio">
      <div className="filters__radio-div">
        <input
          className="filters__radio-sweet"
          type="radio"
          id="sweet"
          name="type"
          value="sweet"
        />
        <label htmlFor="sweet">Dulce</label>
      </div>
      <div>
        <input
          className="filters__radio-salty"
          type="radio"
          id="salty"
          name="type"
          value="salty"
        />
        <label htmlFor="salty">Salado</label>
      </div>
    </div>
  );
}

RadioFilter.propTypes = {
  onSearch: PropTypes.func,
};

export default RadioFilter;
