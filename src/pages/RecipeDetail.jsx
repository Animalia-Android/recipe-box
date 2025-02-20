// // import { useParams, Link } from 'react-router-dom';
// // import { useEffect, useState } from 'react';
// // import '../styles/RecipeDetail.css';

// // export default function RecipeDetail() {
// //   const { id } = useParams();
// //   const [recipe, setRecipe] = useState(null);

// //   useEffect(() => {
// //     const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
// //     const foundRecipe = savedRecipes.find((r) => r.id === Number(id));
// //     setRecipe(foundRecipe);
// //   }, [id]);

// //   if (!recipe) return <p>Recipe not found.</p>;

// //   return (
// //     <div className="recipe-detail-container">
// //       <h1>{recipe.name}</h1>
// //       <img src={recipe.image} alt={recipe.name} />
// //       <h3>Ingredients</h3>
// //       <p>{recipe.ingredients}</p>
// //       <h3>Instructions</h3>
// //       <p>{recipe.instructions}</p>
// //       <Link to="/">
// //         <button>⬅ Back to Home</button>
// //       </Link>
// //     </div>
// //   );
// // }

// // import { useParams, Link } from 'react-router-dom';
// // import { useEffect, useState } from 'react';
// // import '../styles/RecipeDetail.css';

// // export default function RecipeDetail() {
// //   const { id } = useParams();
// //   const [recipe, setRecipe] = useState(null);
// //   const [favorites, setFavorites] = useState(new Set());

// //   useEffect(() => {
// //     const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
// //     const foundRecipe = savedRecipes.find((r) => r.id === Number(id));
// //     setRecipe(foundRecipe);

// //     // Load favorites from Local Storage
// //     setFavorites(new Set(JSON.parse(localStorage.getItem('favorites')) || []));
// //   }, [id]);

// //   const toggleFavorite = () => {
// //     if (!recipe) return;

// //     const updatedFavorites = new Set(favorites);
// //     if (updatedFavorites.has(recipe.id)) {
// //       updatedFavorites.delete(recipe.id); // Remove from favorites
// //     } else {
// //       updatedFavorites.add(recipe.id); // Add to favorites
// //     }

// //     setFavorites(updatedFavorites);
// //     localStorage.setItem('favorites', JSON.stringify([...updatedFavorites]));
// //   };

// //   if (!recipe) return <p>Recipe not found.</p>;

// //   return (
// //     <div className="recipe-detail-container">
// //       <h1>{recipe.name}</h1>
// //       <img src={recipe.image} alt={recipe.name} />

// //       <h3>Ingredients</h3>
// //       <p>{recipe.ingredients}</p>

// //       <h3>Instructions</h3>
// //       <p>{recipe.instructions}</p>

// //       {/* Favorite Button */}
// //       <button className="favorite-btn" onClick={toggleFavorite}>
// //         {favorites.has(recipe.id) ? '❤️ Unfavorite' : '🤍 Favorite'}
// //       </button>

// //       <Link to="/">
// //         <button>⬅ Back to Home</button>
// //       </Link>
// //     </div>
// //   );
// // }

// import { useParams, Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import '../styles/RecipeDetail.css';

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [favorites, setFavorites] = useState(new Set());

//   useEffect(() => {
//     const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
//     const foundRecipe = savedRecipes.find((r) => r.id === Number(id));

//     if (foundRecipe) {
//       setRecipe(foundRecipe);
//     } else {
//       // If not found in local storage, try fetching from API
//       fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.meals) {
//             setRecipe(data.meals[0]); // Set API recipe
//           }
//         })
//         .catch((error) => console.error('Error fetching API recipe:', error));
//     }

//     setFavorites(new Set(JSON.parse(localStorage.getItem('favorites')) || []));
//   }, [id]);

//   const toggleFavorite = () => {
//     if (!recipe) return;

//     const updatedFavorites = new Set(favorites);
//     if (updatedFavorites.has(recipe.idMeal || recipe.id)) {
//       updatedFavorites.delete(recipe.idMeal || recipe.id);
//     } else {
//       updatedFavorites.add(recipe.idMeal || recipe.id);
//     }

//     setFavorites(updatedFavorites);
//     localStorage.setItem('favorites', JSON.stringify([...updatedFavorites]));
//   };

//   if (!recipe) return <p>Recipe not found.</p>;

//   return (
//     <div className="recipe-detail-container">
//       <h1>{recipe.strMeal || recipe.name}</h1>
//       <img
//         src={recipe.strMealThumb || recipe.image}
//         alt={recipe.strMeal || recipe.name}
//       />

//       <h3>Ingredients</h3>
//       <ul>
//         {Object.keys(recipe)
//           .filter((key) => key.startsWith('strIngredient') && recipe[key])
//           .map((key, index) => (
//             <li key={index}>
//               {recipe[key]} - {recipe[`strMeasure${key.slice(-1)}`]}
//             </li>
//           ))}
//       </ul>

//       <h3>Instructions</h3>
//       <p>{recipe.strInstructions || recipe.instructions}</p>

//       {/* Favorite Button */}
//       <button className="favorite-btn" onClick={toggleFavorite}>
//         {favorites.has(recipe.idMeal || recipe.id)
//           ? '❤️ Unfavorite'
//           : '🤍 Favorite'}
//       </button>

//       <Link to="/">
//         <button>⬅ Back to Home</button>
//       </Link>
//     </div>
//   );
// }

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/RecipeDetail.css';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const foundRecipe = savedRecipes.find((r) => r.id === Number(id));

    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      // If not found in local storage, try fetching from API
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.meals) {
            setRecipe(data.meals[0]); // Set API recipe
          }
        })
        .catch((error) => console.error('Error fetching API recipe:', error));
    }

    setFavorites(new Set(JSON.parse(localStorage.getItem('favorites')) || []));
  }, [id]);

  const toggleFavorite = () => {
    if (!recipe) return;

    let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.has(recipe.idMeal || recipe.id)) {
      savedFavorites = savedFavorites.filter(
        (fav) => fav.idMeal !== recipe.idMeal
      );
    } else {
      savedFavorites.push({
        idMeal: recipe.idMeal || recipe.id,
        strMeal: recipe.strMeal || recipe.name,
        strMealThumb: recipe.strMealThumb || recipe.image,
        strCategory: recipe.strCategory || 'Unknown',
        strArea: recipe.strArea || 'Unknown',
      });
    }

    setFavorites(new Set(savedFavorites.map((fav) => fav.idMeal || fav.id)));
    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
  };

  if (!recipe) return <p>Recipe not found.</p>;

  const saveToMyRecipes = () => {
    if (!recipe) return;

    let savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Prevent duplicate saves
    if (savedRecipes.some((r) => r.idMeal === recipe.idMeal)) {
      alert('This recipe is already in your collection!');
      return;
    }

    savedRecipes.push({
      id: recipe.idMeal || Date.now(), // Generate an ID for API recipes
      name: recipe.strMeal || recipe.name,
      image: recipe.strMealThumb || recipe.image,
      category: recipe.strCategory || 'Unknown',
      area: recipe.strArea || 'Unknown',
      instructions: recipe.strInstructions || recipe.instructions,
    });

    localStorage.setItem('recipes', JSON.stringify(savedRecipes));
    alert('Recipe added to My Recipes!');
  };

  return (
    <div className="recipe-detail-container">
      <h1>{recipe.strMeal || recipe.name}</h1>
      <img
        src={recipe.strMealThumb || recipe.image}
        alt={recipe.strMeal || recipe.name}
      />

      <h3>Ingredients</h3>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient') && recipe[key])
          .map((key, index) => (
            <li key={index}>
              {recipe[key]} - {recipe[`strMeasure${key.slice(-1)}`]}
            </li>
          ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe.strInstructions || recipe.instructions}</p>

      {/* Favorite Button */}
      <button className="favorite-btn" onClick={toggleFavorite}>
        {favorites.has(recipe.idMeal || recipe.id)
          ? '❤️ Unfavorite'
          : '🤍 Favorite'}
      </button>

      {/* Save to My Recipes Button */}
      <button className="save-btn" onClick={saveToMyRecipes}>
        📖 Save to My Recipes
      </button>

      <Link to="/">
        <button>⬅ Back to Home</button>
      </Link>
    </div>
  );
}
