import { useEffect, useState } from "react";
import './Body.css';
import bgImage from './images/laptop-bg-image.png';
import myProfileImage from './images/image.png'
export default function Body() {
  const [hide, setHide] = useState(false);
 useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setHide(true);
      window.removeEventListener("scroll", handleScroll);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      {/*Laptop BG Section with my bio*/}
      <section id="bio" className="laptop-hero">
        <img class="laptop-bg" src={bgImage} alt="bg image"/>
        <div className="screen-content">
          <div className="screen-inner">
            <div className="about-header">
              <div className="avatar">
                 <img 
                    src={myProfileImage}
                    alt="Avatar"
                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                  />
              </div>
              <div className="about-intro">
                <h1>I'm <em>DEV</em>.</h1>
                <p className="role">Electronics Engineer | SAA-CO3 Certified | DevOps | AI/ML | VLSI and Nanotechnology Enthusiast</p>
              </div>
            </div>
          </div>
           <div className={`scroll-hint${hide ? " hide" : ""}`}>
              <span>Scroll</span>
              <div className="scroll-line"></div>
          </div>
        </div>
      </section>
    </>
  );
}
