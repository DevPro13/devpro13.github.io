import './App.css';
export default function Nav() {
  return (
    <nav>
      <div className="nav-logo">Devraj Parajuli</div>
      <ul className="nav-links">
        <li><a href="#about" className="active">About</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}
