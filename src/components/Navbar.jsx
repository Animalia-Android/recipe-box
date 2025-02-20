import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>📖 RecipeBox</h1>
      </Link>
      <div>
        <Link to="/">Home</Link>
        <Link to="/add">Add Recipe</Link>
      </div>
    </nav>
  );
}
