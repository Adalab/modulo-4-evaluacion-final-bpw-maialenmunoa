import PropTypes from "prop-types";

//Importar componentes
import RecipeCard from "./RecipeCard";

//Importar estilos
import "../scss/App.scss";


function RecipeList({ recipes }) {
  const renderRecipes = recipes.map((recipe) => (
    <li key={recipe.id} className="recipes__li">
      <RecipeCard recipe={recipe} />
    </li>
  ));

  return (
    <>
      <ul className="recipes"> {renderRecipes} </ul>
    </>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeList;
