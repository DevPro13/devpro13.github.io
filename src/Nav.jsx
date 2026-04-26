import { useState, useEffect } from 'react';
import './App.css';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav>
      <div className="nav-logo">Devraj Parajuli</div>

      {/* Desktop links */}
      <ul className="nav-links">
        <li><a href="#home" className="active">Home</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#publication">Publications</a></li>
        <li><a href="#blogs">Blogs</a></li>
        <li><a href="#experience">Experience</a></li>
      </ul>

      {/* Hamburger button */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#home" className="active" onClick={handleLinkClick}>Home</a></li>
          <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
          <li><a href="#publication" onClick={handleLinkClick}>Publications</a></li>
          <li><a href="#blogs" onClick={handleLinkClick}>Blogs</a></li>
          <li><a href="#experience" onClick={handleLinkClick}>Experience</a></li>
        </ul>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </nav>
  );
}