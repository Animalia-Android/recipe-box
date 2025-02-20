const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

// Cache the fetched recipe
let cachedDailyRecipe = null;

export async function fetchDailyRecipe() {
  if (cachedDailyRecipe) {
    console.log('Using cached daily recipe');
    return cachedDailyRecipe;
  }

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.meals) {
      cachedDailyRecipe = data.meals[0]; // Cache the recipe
      return cachedDailyRecipe;
    } else {
      throw new Error('No meals found in API response.');
    }
  } catch (error) {
    console.error('Error fetching daily recipe:', error);
    return null;
  }
}

// const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

// // Fetches a new recipe only if the day has changed
// export async function fetchDailyRecipe() {
//   const storedRecipe = JSON.parse(localStorage.getItem('dailyRecipe'));
//   const storedDate = localStorage.getItem('dailyRecipeDate');

//   // Get today's date in YYYY-MM-DD format
//   const today = new Date().toISOString().split('T')[0];

//   // If stored recipe exists and the date matches today, return it
//   if (storedRecipe && storedDate === today) {
//     console.log('Using cached daily recipe');
//     return storedRecipe;
//   }

//   // Otherwise, fetch a new recipe
//   try {
//     const response = await fetch(API_URL);
//     const data = await response.json();

//     if (data.meals) {
//       const newRecipe = data.meals[0];

//       // Save new recipe and date in Local Storage
//       localStorage.setItem('dailyRecipe', JSON.stringify(newRecipe));
//       localStorage.setItem('dailyRecipeDate', today);

//       return newRecipe;
//     } else {
//       throw new Error('No meals found in API response.');
//     }
//   } catch (error) {
//     console.error('Error fetching daily recipe:', error);
//     return null;
//   }
// }
