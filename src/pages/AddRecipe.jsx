import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddRecipe.css';

export default function AddRecipe() {
  const [recipe, setRecipe] = useState({
    name: '',
    image: '',
    ingredients: '',
    instructions: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve existing recipes from Local Storage or create an empty array
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Add new recipe
    const updatedRecipes = [...savedRecipes, { ...recipe, id: Date.now() }];

    // Save to Local Storage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    // Redirect to Home Page
    navigate('/');
  };

  return (
    <div className="add-recipe-container">
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>Recipe Name:</label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          required
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={recipe.image}
          onChange={handleChange}
          required
        />

        <label>Ingredients (comma-separated):</label>
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          required
        />

        <label>Instructions:</label>
        <textarea
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Recipe</button>
      </form>
    </div>
  );
}
