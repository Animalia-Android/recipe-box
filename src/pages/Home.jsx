// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Home.css';

// export default function Home() {
//   const [recipes, setRecipes] = useState([]);

//   // Load recipes from Local Storage when the page loads
//   useEffect(() => {
//     const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
//     setRecipes(savedRecipes);
//   }, []);

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
//             <Link
//               to={`/recipe/${recipe.id}`}
//               key={recipe.id}
//               className="recipe-card"
//             >
//               <img src={recipe.image} alt={recipe.name} />
//               <h3>{recipe.name}</h3>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Home.css';

// export default function Home() {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     setRecipes(JSON.parse(localStorage.getItem('recipes')) || []);
//   }, []);

//   const handleDelete = (id) => {
//     // Filter out the deleted recipe
//     const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);

//     // Update Local Storage
//     localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

//     // Update state
//     setRecipes(updatedRecipes);
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
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [lastDeleted, setLastDeleted] = useState(null); // Stores last deleted recipe

  useEffect(() => {
    setRecipes(JSON.parse(localStorage.getItem('recipes')) || []);
  }, []);

  const handleDelete = (id) => {
    // Find the recipe being deleted
    const recipeToDelete = recipes.find((recipe) => recipe.id === id);

    // Show confirmation popup before deleting
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${recipeToDelete.name}"?`
    );
    if (!confirmDelete) return;

    // Filter out the deleted recipe
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);

    // Save the last deleted recipe for Undo
    setLastDeleted(recipeToDelete);

    // Update Local Storage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    // Update state
    setRecipes(updatedRecipes);
  };

  const handleUndo = () => {
    if (!lastDeleted) return;

    // Restore the last deleted recipe
    const updatedRecipes = [...recipes, lastDeleted];

    // Save to Local Storage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    // Update state
    setRecipes(updatedRecipes);

    // Clear last deleted recipe
    setLastDeleted(null);
  };

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

      {/* Undo Button */}
      {lastDeleted && (
        <div className="undo-container">
          <p>Recipe deleted: "{lastDeleted.name}"</p>
          <button className="undo-btn" onClick={handleUndo}>
            🔄 Undo
          </button>
        </div>
      )}
    </div>
  );
}
