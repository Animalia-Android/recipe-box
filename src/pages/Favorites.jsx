import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MyRecipes.css';

export default function Favorites() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    handleFavoriteUpdate();

    // Listen for changes in Local Storage (when the user updates favorites)
    const handleStorageChange = () => {
      handleFavoriteUpdate();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleFavoriteUpdate = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    setFavorites(new Set(savedFavorites.map((fav) => fav.idMeal || fav.id)));

    // Merge local and API recipes
    const allFavorites = [
      ...savedRecipes.filter((recipe) =>
        savedFavorites.some(
          (fav) => fav.idMeal === recipe.id || fav.idMeal === recipe.idMeal
        )
      ),
      ...savedFavorites.filter(
        (fav) =>
          !savedRecipes.some(
            (recipe) => recipe.id === fav.idMeal || recipe.idMeal === fav.idMeal
          )
      ),
    ];

    setRecipes(allFavorites);
  };

  return (
    <div className="recipes-container">
      <h1>❤️ Favorite Recipes</h1>

      {recipes.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal || recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.idMeal || recipe.id}`}>
                <img
                  src={recipe.strMealThumb || recipe.image}
                  alt={recipe.strMeal || recipe.name}
                />
                <h3>{recipe.strMeal || recipe.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
