import { useState, useEffect } from 'react';
import './Navigation.css';

export default function Nav() {
const [menuOpen, setMenuOpen] = useState(false);
const [activeSection, setActiveSection] = useState('home');

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

  // Track active section using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'publication', 'blogs', 'experience'];

    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          root: null,
          // Triggers when section enters the middle 40% of the viewport
          rootMargin: '-30% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#publication', label: 'Publications', id: 'publication' },
    { href: '#blogs', label: 'Blogs', id: 'blogs' },
    { href: '#experience', label: 'Experience', id: 'experience' },
  ];

  return (
    <nav>
      <div className="nav-logo">
        <div className="tab">
          <span className="symbol">~</span>
        </div>
        cat ~/devraj-parajuli
      </div>

      {/* Desktop links */}
      <ul className="nav-links">
        {navLinks.map(({ href, label, id }) => (
          <li key={id}>
            <a href={href} className={activeSection === id ? 'active' : ''}>
              {label}
            </a>
          </li>
        ))}
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
          {navLinks.map(({ href, label, id }) => (
            <li key={id}>
              
                <a href={href}
                className={activeSection === id ? 'active' : ''}
                onClick={handleLinkClick}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </nav>
  );
}