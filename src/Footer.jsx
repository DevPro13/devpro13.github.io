import './Footer.css';
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div className="footer-socials">
        <a href="https://instagram.com/dev13himself" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com/in/devpro13" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="https://github.com/devpro13" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://twitter.com/dev13himself" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter />
        </a>
      </div>
      <p className="footer-copy">Copyright © 2026 Devraj Parajuli. All Right Reserved.</p>
    </footer>
  );
}