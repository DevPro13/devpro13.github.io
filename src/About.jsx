import React, { useEffect, useRef } from "react";
import "./About.css";
const stats = [
  { num: "2+", label: "Years Exp." },
  { num: "12", label: "Projects" },
  { num: "2", label: "Awards" },
];
 
export default function About() {
  const sectionRef = useRef(null);
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );
 
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
 
    return () => observer.disconnect();
  }, []);
 
  return (
    <section className="about-section" ref={sectionRef}>
      {/* Background grid accent */}
      <div className="about-grid-bg" aria-hidden="true" />
 
      <div className="about-inner">
        {/* Label */}
        <div className="about-label reveal">
          <span className="label-line" />
          <span>About Me</span>
          <span className="label-line" />
        </div>
 
        {/* Bio */}
        <p className="about-bio reveal">
          Electronics Engineer passionate about contributing to{" "}
          <em>Microelectronics</em>, <em>VLSI</em>, and{" "}
          <em>Nanotechnology</em>. Keenly interested in design and performance
          optimization through <em>Machine Learning</em> and{" "}
          <em>Deep Learning</em> integration—alongside emerging fields such as
          embedded intelligent systems, quantum computing, AI, cloud computing,
          and data engineering.
        </p>
        <div className="stats-row reveal">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
 
        {/* CTA */}
        <div className="cta-row reveal">
          <button className="btn-primary">Download CV</button>
          <button className="btn-ghost">Say Hello →</button>
        </div>
      </div>
    </section>
  );
}