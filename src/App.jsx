import { Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyRecipes from './pages/MyRecipes';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import Favorites from './pages/Favorites';
import Auth from './pages/Auth';

export default function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<MyRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}
