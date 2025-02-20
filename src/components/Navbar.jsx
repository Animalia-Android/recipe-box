import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>📖 RecipeBox</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/add">Add Recipe</Link>
      </div>
    </nav>
  );
}
