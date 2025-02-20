import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import '../styles/Navbar.css';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>📖 RecipeBox</h1>
      </Link>
      <div>
        {/* <Link to="/">Home</Link> */}
        <Link to="/recipes">My Recipes</Link>
        <Link to="/favorites">❤️ Favorites</Link>
        {user ? (
          <>
            <button className="logout-btn" onClick={() => signOut(auth)}>
              Log Out
            </button>
          </>
        ) : (
          <Link to="/auth">Log In</Link>
        )}
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}
