import React, { useEffect, useRef } from "react";
import myCV from "./docs/CV_Devraj_ParajuliCloudComputing.pdf";
import "./About.css";
const stats = [
  { num: "2+", label: "Years Exp." },
  { num: "12", label: "Projects" },
  { num: "2", label: "Awards" },
];
 
export default function About() {
  const sectionRef = useRef(null);
  const functionDownloadCV=()=>{
    const link = document.createElement("a");
          link.href = myCV;
          link.download = "CV_Devraj_Parajuli_2026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const functionSayHello=()=>{
    window.location.href="mailto:devrajparajuli13@gmail.com?subject=Hello%20There&body=Hi%20Devraj,%20I%20visited%20your%20portfolio...";
  }
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
    <section id="about" className="about-section" ref={sectionRef}>
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
          I'm an <em>Electronics Engineer</em> graduated from Pulchowk Campus. My work span both in Hardware and Software domain. I am extremely passionate about hardware domain specially to{" "}
          <em>Microelectronics</em>, <em>VLSI</em>, and <em>Nanotechnology</em>. 
          <br/>
          {"    "}My current research focuses on agentic methods for design and performance
          optimization of IC through <em>Machine Learning</em> and{" "}
          <em>Deep Learning</em>. Additionally, I am enthusiastic to emerging fields such as{" "}
          <em>Embedded Intelligent Systems</em>, <em>Quantum Computing</em>, <em>Robotics</em>, <em>Cloud Computing</em>,
          and <em>IoTs</em>.
          <br />
          {"    "}In <em>Software domain</em>, my expertise and skills lies in <em>Data Engineering</em>, <em>Backend Technology</em>, <em>System Design</em> and <em>Cloud Technologies</em>. I am recently certified with an <em>AWS Solution Architect- Associate</em> Certification and poses experience of designing <em>High Performance</em>, <em>Cost Effective</em>, <em>Resilient </em>and <em>Secure</em> Architectures in AWS Cloud.
        </p>
        <div className="cta-row reveal">
          <button className="btn-primary" onClick={functionDownloadCV}>Download CV</button>
          <button className="btn-ghost" onClick={functionSayHello}>Say Hello →</button>
        </div>
      </div>
    </section>
  );
}