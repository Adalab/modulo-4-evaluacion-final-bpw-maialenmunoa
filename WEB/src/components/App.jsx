import { useState, useEffect } from "react";

//Importar componentes
import RecipeList from "../recipes/RecipeList";
import Filters from "../filters/Filters";
import CreateRecipe from "../pages/CreateRecipe";

import "../scss/App.scss";

function App() {
  //variables de estado
  const [recipes, setRecipes] = useState([]);
  const [filterIngredient, setFilterIngredient] = useState(''); 


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("//localhost:3000/api/recetas");
        const data = await response.json();
        if (Array.isArray(data.results)) {
          setRecipes(data.results);
        } else {
          console.error("La respuesta de la API no es un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener las recetas:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleFilter = async (filterName, value) => {
    if (filterName === "ingredient") {
      setFilterIngredient(value);
      try {
        const response = await fetch(
          `//localhost:3000/api/recetas/ingrediente/${value}`
        );
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error al obtener las recetas por ingrediente:", error);
      }
    }
  };

  const handleCreateRecipe = async () => {
    try {
      // Realizar una nueva solicitud para obtener la lista actualizada de recetas
      const response = await fetch("//localhost:3000/api/recetas");
      const data = await response.json();
      if (Array.isArray(data.results)) {
        // Actualizar el estado de las recetas con la lista actualizada de recetas
        setRecipes(data.results);
      } else {
        console.error("La respuesta de la API no es un array:", data);
      }
    } catch (error) {
      console.error("Error al obtener las recetas:", error);
    }
  };

  // const handleEdit = () => {
  //   //FETCH editar una receta
  // };

  // const handleDelete = () => {
  //   //FETCH borrar una receta
  // };

  return (
    <div className="page">
      <header className="header">
        <h1>Mis Recetas</h1>
      </header>

      <main className="main">
      
        <Filters handleFilter={handleFilter} filterIngredient={filterIngredient}/>
        {Array.isArray(recipes) && <RecipeList recipes={recipes} />}
        <CreateRecipe onCreateRecipe={handleCreateRecipe} />

      </main>

      <footer>
        <p>© 2024 Mis Recetas</p>
      </footer>
    </div>
  );
}

export default App;
