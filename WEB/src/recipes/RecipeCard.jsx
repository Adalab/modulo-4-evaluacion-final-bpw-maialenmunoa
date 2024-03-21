import PropTypes from "prop-types";

//Importar estilos


function RecipeCard({ recipe }) {
  return (
    <div className="recipes">
      <div className="recipes__card">
        <img src={recipe.imagen} alt={recipe.nombre} />
        <h2>{recipe.nombre}</h2>
      </div>
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
