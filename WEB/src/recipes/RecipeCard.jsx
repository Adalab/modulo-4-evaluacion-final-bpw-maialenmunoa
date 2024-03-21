import PropTypes from "prop-types";

//Importar estilos

import "../scss/App.scss";


function RecipeCard({ recipe }) {
  return (
      <div className="recipes__card">
        <img className="recipes__card-img" src={recipe.imagen} alt={recipe.nombre} />
        <h2 className="recipes__card-text">{recipe.nombre}</h2>
      </div>
  );
}

//proptypes 
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    nombre: PropTypes.string,
    imagen: PropTypes.string,
  }),
};
    
export default RecipeCard;
