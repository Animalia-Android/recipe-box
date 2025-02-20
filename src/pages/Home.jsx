import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  // Load recipes from Local Storage when the page loads
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(savedRecipes);
  }, []);

  return (
    <div className="home-container">
      <header>
        <h1>RecipeBox 🍽️</h1>
        <Link to="/add">
          <button className="add-btn">➕ Add New Recipe</button>
        </Link>
      </header>

      {recipes.length === 0 ? (
        <p>No recipes yet. Add some delicious recipes!</p>
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe.id}`}
              key={recipe.id}
              className="recipe-card"
            >
              <img src={recipe.image} alt={recipe.name} />
              <h3>{recipe.name}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
