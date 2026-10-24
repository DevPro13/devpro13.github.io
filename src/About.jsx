import React, { useEffect, useRef } from "react";
import myCV from "./docs/CV_Devraj_Parajuli_PhD_2026.pdf";
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
          I am a graduate in <em>Electronics, Communication and Information Engineering</em> from IOE, Pulchowk Campus, Tribhuvan University. My work spans Hardware, Software and Machine Learning Applications. I am extremely passionate about hardware domain specifically in {" "}
          <em>Microelectronics</em>, <em>Computer Architectures</em>, <em>VLSI Design</em>, and <em>AI Hardware</em>.
          <br/>
          {"    "}My current research focuses on reliable, secure and high performing AI hardware design for irregular and dynamic workloads such as graphs. <em>I am deeply interested in designing efficient AI accelerators for workloads such as GNNs and Transformers, particularly in addressing data movement, memory access, and latency bottlenecks</em>. I am passionate about bridging microelectronics and machine learning to solve critical challenges in computing systems and micro-architectures for AI workloads.
           Additionally, I am enthusiastic about emerging fields such as{" "}
          <em>Embedded Intelligent Systems</em>, <em>Quantum Computing</em>, <em>Robotics</em>, <em>Cloud Computing</em>,
          and <em>IoT Systems</em>.
          <br />
          {"    "}In <em>Software domain</em>, my expertise and skills lie in <em>Data Engineering</em>, <em>Backend Technology</em>, <em>System Design</em> and <em>Cloud Technologies</em>. I am recently certified with an <em>AWS Solution Architect- Associate</em> Certification and bring experience of designing <em>High Performance</em>, <em>Cost Effective</em>, <em>Resilient </em>and <em>Secure</em> Architectures in AWS Cloud.
        
        <br />
        <br />
        <em>Research Interests and Areas: </em><b>VLSI Design, Hardware Accelerators In-Memory Computing, Secure Designs,
Microelectronics Systems, CAD Tools.</b>
        </p>
        <div className="cta-row reveal">
          <button className="btn-primary" onClick={functionDownloadCV}>Download CV</button>
          <button className="btn-ghost" onClick={functionSayHello}>Say Hello →</button>
        </div>
      </div>
    </section>
  );
}