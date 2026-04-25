import './App.css';
import bgImage from './images/free-image.jpg';
export default function Body() {
  return (
    <>
      {/* Hero / About Section */}
      <section id="about" className="laptop-hero">
        <img class="laptop-bg" src={bgImage} alt="bg image"/>
        <div className="screen-content">
          {/* Fake browser chrome */}
          <div className="browser-bar">
            <span className="dot r"></span>
            <span className="dot y"></span>
            <span className="dot g"></span>
            <div className="url-bar">alexmorgan.dev/about</div>
          </div>

          {/* Scrollable content inside screen */}
          <div className="screen-inner">
            <div className="about-header">
              <div className="avatar">A</div>
              <div className="about-intro">
                <h1>Hello, I'm <em>Alex</em>.</h1>
                <p className="role">UI/UX Designer &amp; Developer</p>
              </div>
            </div>

            <div className="divider"></div>

            <p className="bio">
              I craft <strong>digital experiences</strong> that sit at the intersection of design and engineering.
              With 6+ years building products for startups and global brands, I turn complex problems
              into <strong>intuitive, beautiful interfaces</strong> people love to use.
            </p>

            <div className="skills-grid">
              <div className="skill-item">
                <div className="skill-name">UI Design</div>
                <div className="skill-bar-bg"><div className="skill-bar" style={{ width: "92%" }}></div></div>
              </div>
              <div className="skill-item">
                <div className="skill-name">React / Next.js</div>
                <div className="skill-bar-bg"><div className="skill-bar" style={{ width: "88%" }}></div></div>
              </div>
              <div className="skill-item">
                <div className="skill-name">Motion Design</div>
                <div className="skill-bar-bg"><div className="skill-bar" style={{ width: "80%" }}></div></div>
              </div>
              <div className="skill-item">
                <div className="skill-name">Branding</div>
                <div className="skill-bar-bg"><div className="skill-bar" style={{ width: "75%" }}></div></div>
              </div>
            </div>

            <div className="stats-row">
              <div className="stat"><div className="stat-num">6+</div><div className="stat-label">Years Exp.</div></div>
              <div className="stat"><div className="stat-num">48</div><div className="stat-label">Projects</div></div>
              <div className="stat"><div className="stat-num">12</div><div className="stat-label">Awards</div></div>
            </div>

            <div className="contact-row">
              <button className="contact-pill">Download CV</button>
              <button className="contact-pill ghost">Say Hello →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Below-laptop sections */}
      <div className="below-laptop" id="work">
        <div className="section-card">
          <h2>Selected Work</h2>
          <p>A curated collection of projects spanning product design, web apps, and brand identities.</p>
          <div className="project-item">
            <h3>Fintra — Banking App</h3>
            <p>End-to-end design &amp; frontend for a neobank serving 200k+ users.</p>
          </div>
          <div className="project-item">
            <h3>Vela Design System</h3>
            <p>Component library &amp; documentation used across 5 enterprise products.</p>
          </div>
        </div>

        <div className="section-card">
          <h2>Background</h2>
          <p>
            Based in Kathmandu. Previously at{" "}
            <strong style={{ color: "#c8a96e" }}>Studio Koto</strong>,{" "}
            <strong style={{ color: "#c8a96e" }}>Figma</strong> (intern), and a handful of early-stage startups.
            I'm drawn to work that demands both creative and technical depth — the kind where pixels and code are equally important.
          </p>
        </div>

        <div className="section-card" id="contact">
          <h2>Get in Touch</h2>
          <p>Open to freelance projects, full-time roles, and interesting conversations.</p>
          <div style={{ marginTop: "1.2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <a href="mailto:hello@alexmorgan.dev" style={{ color: "#c8a96e", fontSize: "0.85rem", textDecoration: "none" }}>
              hello@alexmorgan.dev
            </a>
            <a href="#" style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.8rem", textDecoration: "none" }}>Twitter / X</a>
            <a href="#" style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.8rem", textDecoration: "none" }}>LinkedIn</a>
            <a href="#" style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.8rem", textDecoration: "none" }}>GitHub</a>
          </div>
        </div>
      </div>
    </>
  );
}
