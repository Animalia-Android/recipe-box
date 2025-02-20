// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Home.css';

// export default function Home() {
//   const [recipes, setRecipes] = useState([]);
//   const [lastDeleted, setLastDeleted] = useState(null); // Stores last deleted recipe

//   const [undoTimer, setUndoTimer] = useState(5); // Countdown timer

//   useEffect(() => {
//     setRecipes(JSON.parse(localStorage.getItem('recipes')) || []);
//   }, []);

//   const handleDelete = (id) => {
//     // Find the recipe being deleted
//     const recipeToDelete = recipes.find((recipe) => recipe.id === id);

//     // Show confirmation popup before deleting
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete "${recipeToDelete.name}"?`
//     );
//     if (!confirmDelete) return;

//     // Filter out the deleted recipe
//     const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);

//     // Save the last deleted recipe for Undo
//     setLastDeleted(recipeToDelete);
//     localStorage.setItem('lastDeleted', JSON.stringify(recipeToDelete));

//     // Start countdown for Undo
//     setUndoTimer(10);
//     const interval = setInterval(() => {
//       setUndoTimer((prev) => prev - 1);
//     }, 1000);

//     // Set a timer to clear undo option after 10 seconds
//     setTimeout(() => {
//       setLastDeleted(null);
//       localStorage.removeItem('lastDeleted');
//       clearInterval(interval);
//     }, 10000);

//     // Update Local Storage
//     localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

//     // Update state
//     setRecipes(updatedRecipes);
//   };

//   const handleUndo = () => {
//     if (!lastDeleted) return;

//     // Restore the last deleted recipe
//     const updatedRecipes = [...recipes, lastDeleted];

//     // Save to Local Storage
//     localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

//     // Update state
//     setRecipes(updatedRecipes);

//     // Clear last deleted recipe
//     setLastDeleted(null);
//     localStorage.removeItem('lastDeleted');
//   };

//   return (
//     <div className="home-container">
//       <header>
//         <h1>RecipeBox 🍽️</h1>
//         <Link to="/add">
//           <button className="add-btn">➕ Add New Recipe</button>
//         </Link>
//       </header>

//       {recipes.length === 0 ? (
//         <p>No recipes yet. Add some delicious recipes!</p>
//       ) : (
//         <div className="recipe-list">
//           {recipes.map((recipe) => (
//             <div key={recipe.id} className="recipe-card">
//               <Link to={`/recipe/${recipe.id}`}>
//                 <img src={recipe.image} alt={recipe.name} />
//                 <h3>{recipe.name}</h3>
//               </Link>
//               <button
//                 className="delete-btn"
//                 onClick={() => handleDelete(recipe.id)}
//               >
//                 ❌ Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Undo Button */}
//       {/* Snackbar-style Undo Message */}
//       {lastDeleted && (
//         <div className="undo-container">
//           <p>
//             Recipe deleted: {lastDeleted.name} ( {undoTimer}`s left )
//           </p>
//           <button className="undo-btn" onClick={handleUndo}>
//             🔄 Undo
//           </button>
//         </div>
//       )}
//       {/* {lastDeleted && (
//         <div className="undo-container">
//           <p>Recipe deleted: "{lastDeleted.name}"</p>
//           <button className="undo-btn" onClick={handleUndo}>
//             🔄 Undo
//           </button>
//         </div>
//       )} */}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDailyRecipe } from '../utils/recipeApi';
import '../styles/Home.css';

export default function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [message, setMessage] = useState('');
  const [dailyRecipe, setDailyRecipe] = useState(null);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Randomly select 2 featured recipes (if available)
    if (savedRecipes.length > 0) {
      const shuffled = savedRecipes.sort(() => 0.5 - Math.random());
      setFeaturedRecipes(shuffled.slice(0, 2));
    }

    // Rotate cooking tips
    const tips = [
      '👨‍🍳 Cooking Tip: Let your meat rest after cooking for juicier results!',
      '🔥 Want extra crispy fries? Soak them in water for 30 minutes before frying!',
      '🌿 Fresh herbs can elevate any dish—try adding some basil or cilantro!',
      '🥑 Avocados ripen faster when stored with bananas!',
    ];
    setMessage(tips[Math.floor(Math.random() * tips.length)]);

    // Fetch & Cache the Daily Recipe
    fetchDailyRecipe().then((recipe) => {
      if (recipe) setDailyRecipe(recipe);
    });
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to RecipeBox! 🍽️</h1>
        <p>Your personal cookbook, organized just the way you like it.</p>
        <div className="home-buttons">
          <Link to="/add">
            <button className="cta-btn">➕ Add a Recipe</button>
          </Link>
          <Link to="/recipes">
            <button className="cta-btn secondary">📖 View My Recipes</button>
          </Link>
        </div>
      </div>

      {/* Featured Recipes */}
      {featuredRecipes.length > 0 && (
        <div className="featured">
          <h2>🍲 Featured Recipes</h2>
          <div className="recipe-list">
            {featuredRecipes.map((recipe) => (
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
        </div>
      )}

      {/* Recipe of the Day */}
      {dailyRecipe && (
        <div className="daily-recipe">
          <h2>🍽️ Recipe of the Day</h2>
          <Link to={`/recipe/${dailyRecipe.idMeal}`}>
            <img src={dailyRecipe.strMealThumb} alt={dailyRecipe.strMeal} />
            <h3>{dailyRecipe.strMeal}</h3>
          </Link>
          <p>Category: {dailyRecipe.strCategory}</p>
          <p>Origin: {dailyRecipe.strArea}</p>
        </div>
      )}

      {/* Cooking Tips */}
      <div className="tips">
        <h3>{message}</h3>
      </div>
    </div>
  );
}
