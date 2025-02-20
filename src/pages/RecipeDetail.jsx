import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/RecipeDetail.css';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const foundRecipe = savedRecipes.find((r) => r.id === Number(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-detail-container">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <h3>Ingredients</h3>
      <p>{recipe.ingredients}</p>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      <Link to="/">
        <button>⬅ Back to Home</button>
      </Link>
    </div>
  );
}
