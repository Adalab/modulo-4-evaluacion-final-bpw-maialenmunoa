import { useState, useEffect } from "react";

//Importar componentes
import RecipeList from "../recipes/RecipeList";
import Filters from "../filters/Filters";
import CreateRecipe from "../pages/CreateRecipe";
import LoginForm from "../pages/LoginForm";

import "../scss/App.scss";

function App() {
  //variables de estado
  const [recipes, setRecipes] = useState([]);
  const [filterIngredient, setFilterIngredient] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está autenticado
  const [token, setToken] = useState(null); // Estado para almacenar el token

  useEffect(() => {
    checkAuthentication();
  }, [token]);

  const checkAuthentication = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);

      fetchRecipes();
    } else {
      setIsLoggedIn(false);
    }
  };

  const fetchRecipes = async () => {
    if (!token) return;

    try {
      const response = await fetch("//localhost:3000/api/recetas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const handleFilter = async (filterName, value) => {
    if (filterName === "ingredient") {
      setFilterIngredient(value);
      try {
        const response = await fetch(
          `//localhost:3000/api/recetas/ingrediente/${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
      const response = await fetch("//localhost:3000/api/recetas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        {isLoggedIn ? ( // Verificar si el usuario está autenticado
          <>
            <Filters
              handleFilter={handleFilter}
              filterIngredient={filterIngredient}
            />
            {Array.isArray(recipes) && <RecipeList recipes={recipes} />}
            <CreateRecipe onCreateRecipe={handleCreateRecipe} />
          </>
        ) : (
          <LoginForm setToken={setToken} /> // Mostrar el formulario de inicio de sesión si el usuario no está autenticado
        )}
      </main>

      <footer>
        <p>© 2024 Mis Recetas</p>
      </footer>
    </div>
  );
}

export default App;
