import PropTypes from "prop-types";

//Importar componentes
import RecipeCard from "./RecipeCard";

//Importar estilos
import "../scss/App.scss";


function RecipeList({ recipes }) {
   // Validar si recipes es un array antes de mapear
   if (!Array.isArray(recipes)) {
    console.error("recipes no es un array:", recipes);
    return null; // Otra acción apropiada en caso de no ser un array
  }
  
  const renderRecipes = recipes.map((recipe) => (
    <li key={recipe.id} className="recipes__li">
      <RecipeCard recipe={recipe} />
    </li>
  ));

  return (
    <div className="content">
      <ul className="recipes"> {renderRecipes} </ul>
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeList;
