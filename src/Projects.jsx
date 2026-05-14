import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";
import HardwareSign from "./images/electronics.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// ── Sample project data — replace with your own ──────────
const PROJECTS = [
  // {
  //   id: ,
  //   category: "",
  //   title: "",
  //   tag: "",
  //   image: "",
  //   bio: "",
  //   details:"",
  //   stack: [""],
  //   year: "2024",
  //   link: "",
  // },
  // {
  //   id: ,
  //   category: "Software",
  //   title: "",
  //   tag: "",
  //   image: "",
  //   bio: "",
  //   details:"",
  //   stack: [""],
  //   year: "2024",
  //   link: "",
  // },
  {
    id: 1,
    category: "Software",
    title: "Dijkstra-s-Algorithm-Visualizer",
    tag: "C++, Data Structure",
    image: "https://raw.githubusercontent.com/DevPro13/Dijkstra-s-Algorithm-Visualizer/refs/heads/main/Output/Demo.gif",
    bio: "A neuromorphic processing chip architecture optimized for on-device inference of deep neural networks at ultra-low power.",
    details:"https://raw.githubusercontent.com/DevPro13/OCR-ENGINE-LITE/refs/heads/main/README.md",
    stack: ["Cadence Virtuoso", "Synopsys Design Compiler", "Python", "MATLAB"],
    year: "2024",
    link: "https://github.com/DevPro13/Dijkstra-s-Algorithm-Visualizer",
  },
  {
    id: 2,
    category: "Hardware",
    title: "Startracker Simulator for Attitude Determination of Spacecraft",
    tag: "Embedded · Cloud",
    image: "https://raw.githubusercontent.com/DevPro13/Startracker-Simulator-for-Attitude-Determination-of-Spacecrafts/refs/heads/main/Media/StarTracker.jpg",
    bio: "End-to-end IoT pipeline for real-time environmental monitoring with edge inference and AWS-based data engineering.",
    details:"https://raw.githubusercontent.com/DevPro13/OCR-ENGINE-LITE/refs/heads/main/README.md",
    stack: ["Raspberry PI", "PI Cam", "Star Catalogue", "Pyramid Search","CCD Sensor"],
    year: "2023",
    link: "https://github.com/DevPro13/Startracker-Simulator-for-Attitude-Determination-of-Spacecrafts",
  },
  {
    id: 3,
    category: "Hardware",
    title: "RISC-V-Complete-Multicycle-Processor Design",
    tag: "VLSI design and verification",
    image: "https://raw.githubusercontent.com/DevPro13/RISC-V-Complete-Multicycle-Processor-Design/refs/heads/main/Img/risc-v%20complete.jpg",
    bio: "A Python-based quantum circuit simulator supporting up to 20 qubits with noise modelling and gate-level visualisation.",
    details:"https://raw.githubusercontent.com/DevPro13/RISC-V-Complete-Multicycle-Processor-Design/refs/heads/main/README.md",
     stack: ["Python", "NumPy", "Matplotlib", "Qiskit (validation)"],
    year: "2023",
    link: "https://github.com/DevPro13/RISC-V-Complete-Multicycle-Processor-Design",
  },
   {
    id: 4,
    category: "Hardware",
    title: "Fall Detection and Alerting System",
    tag: "Fall Detection, Hardware Design, PI processor",
    image: "https://raw.githubusercontent.com/DevPro13/Fall-Detection-and-Alarming-Sys/refs/heads/main/Resources/Images/IMG_20241230_154448.jpg",
    bio: "FALL DEt",
    details:"https://raw.githubusercontent.com/DevPro13/Fall-Detection-and-Alarming-Sys/refs/heads/main/README.md",
     stack: ["Python", "Arduino", "LSTM", "KICAD","IMU"],
    year: "2023",
    link: "https://github.com/DevPro13/Fall-Detection-and-Alarming-Sys",
  },
  {
    id: 5,
    category: "Hardware",
    title: "Internet of Medical Things and Streaming",
    tag: "ESP32",
    image: "https://raw.githubusercontent.com/SanimKumarKhatri/IOT_Streaming/refs/heads/main/ESP_With_IMU/IoMT%20Block.png",
    bio: "",
    details:"https://raw.githubusercontent.com/SanimKumarKhatri/IOT_Streaming/refs/heads/main/ESP_With_IMU/README.md",
    stack: ["C++","MongoDB","MQTT Protocol","IMU"],
    year: "2025",
    link: "https://github.com/SanimKumarKhatri/IOT_Streaming",
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("hardware");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next"); // "next" | "prev"
  const [animating, setAnimating] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const total = PROJECTS.length;
  const project = PROJECTS[current];
  const [readme, setReadme] = useState("");
  useEffect(() => {
  setReadme("");
  fetch(project.details)
    .then((res) => res.text())
    .then((text) => setReadme(text))
    .catch((err) => console.error(err));

}, [project]);

  function navigate(dir) {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) =>
        dir === "next" ? (c + 1) % total : (c - 1 + total) % total
      );
      setAnimating(false);
      setExpanded(false);
    }, 380);
  }

  // Close expanded on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section id="projects" className="projects-section">
        {/* Label */}
        <div className="project-inner">
          <div className="project-label">
            <span className="label-line"/>
            <span>Projects</span>
            <span className="label-line"/>
          </div>
        </div>
      {/* Header */}
      <div className="proj-box">
        <div className="proj-toggle-wrap">
          <div className="proj-toggle">
            <span
              className={`toggle-glider ${activeTab === "software" ? "right" : ""}`}
              aria-hidden="true"
            />
            <button
              className={`toggle-btn ${activeTab === "hardware" ? "active" : ""}`}
              onClick={() => { setActiveTab("hardware"); setCurrent(0); setExpanded(false); }}
            >
              <span className="toggle-icon"><img className="Hardwareicon" src={HardwareSign}/></span>
              Hardware
            </button>
            <button
              className={`toggle-btn ${activeTab === "software" ? "active" : ""}`}
              onClick={() => { setActiveTab("software"); setCurrent(0); setExpanded(false); }}
            >
              <span className="toggle-icon">{'</>'}</span>
              Software
            </button>
          </div>
        </div>
      </div>
      {/* Card stage */}
      <div className="card-stage">
        <div
          ref={cardRef}
          className={`proj-card ${animating ? `exit-${direction}` : "enter"}`}
        >
          {/* Image */}
          <div className="card-image-wrap">
            <img
              src={project.image}
              alt={project.title}
              className="card-image"
            />
            <div className="card-image-overlay" />
            {/* <span className="card-tag">{project.tag}</span> */}
            <span className="card-year">{project.year}</span>
          </div>

          {/* Body */}
          <div className="card-body">
            <h3 className="card-title">{project.title}</h3>
            <p className="card-bio">{project.bio}</p>

            {/* Expand toggle */}
            <button
              className="expand-btn"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? "Collapse ↑" : "See README.md ↓"}
            </button>

            {/* Expanded drawer */}
            <div className={`card-details ${expanded ? "open" : ""}`}>
              <div className="details-text markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                       {readme}
                    </ReactMarkdown>
              </div>
              <div className="stack-row">
                {project.stack.map((s) => (
                  <span className="stack-chip" key={s}>{s}</span>
                ))}
              </div>
              <a
                href={project.link}
                className="proj-link"
                target="_blank"
                rel="noreferrer"
              >
                View Project →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="proj-nav">
        <button
          className="nav-btn"
          onClick={() => navigate("prev")}
          aria-label="Previous project"
        >
          ←
        </button>

        {/* Dot indicators */}
        <div className="dot-row">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => {
                if (i === current || animating) return;
                setDirection(i > current ? "next" : "prev");
                setAnimating(true);
                setTimeout(() => {
                  setCurrent(i);
                  setAnimating(false);
                  setExpanded(false);
                }, 380);
              }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="nav-btn"
          onClick={() => navigate("next")}
          aria-label="Next project"
        >
          →
        </button>
      </div>
    </section>
  );
}