import PropTypes from "prop-types";

//Importar componentes
import RecipeCard from "./RecipeCard";

//Importar estilos
import "../scss/App.scss";


function RecipeList({ recipes }) {
  const renderRecipes = recipes.map((recipe) => (
    <li key={recipe.id}>
      <RecipeCard recipe={recipe} />
    </li>
  ));

  return (
    <section className="recipes">
      <ul> {renderRecipes} </ul>
    </section>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeList;
