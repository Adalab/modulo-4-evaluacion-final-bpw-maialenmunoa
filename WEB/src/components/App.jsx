import { useState, useEffect } from "react";

//Importar componentes
import RecipeList from "../recipes/RecipeList";
import Filters from "../filters/Filters";

import "../scss/App.scss";

function App() {
  //variables de estado
  const [recipes, setRecipes] = useState([]);
  const [filterIngredient, setFilterIngredient] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 


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


  // const handleCreate = () => {
  //   //FETCH crear una nueva receta
  //   fetch ("//localhost:3000/api/recetas", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       nombre: "Nombre de la receta",
  //       ingredientes: "Ingredientes de la receta",
  //       instrucciones: "Instrucciones de la receta",
  //       imagen: "URL de la imagen",
  //     }),
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setRecipes([...recipes, data]);
  //   });
  // };

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
      </main>

      <footer>
        <p>© 2024 Mis Recetas</p>
      </footer>
    </div>
  );
}

export default App;
