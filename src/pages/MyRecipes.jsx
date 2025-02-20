import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MyRecipes.css';

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    setRecipes(JSON.parse(localStorage.getItem('recipes')) || []);
  }, []);

  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setRecipes(updatedRecipes);
  };

  // Filter Recipes Based on Search & Category
  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'All' || recipe.category === category)
    );
  });

  return (
    <div className="recipes-container">
      <h1>My Recipes 🍽️</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="filter-dropdown"
      >
        <option value="All">All Categories</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Dessert">Dessert</option>
      </select>

      {/* Recipe List */}
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="recipe-list">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.name} />
                <h3>{recipe.name}</h3>
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDelete(recipe.id)}
              >
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
