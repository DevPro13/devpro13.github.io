import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";
import HardwareSign from "./images/electronics.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PROJECTS = [
  {
    id: 0,
    category: "Software",
    title: "Optical Character Recognition",
    tag: "C++, Data Structure",
    image: "https://raw.githubusercontent.com/DevPro13/OCR-ENGINE-LITE/refs/heads/main/Sample_images/OCR.png",
    bio: "A program to scan textual document and extract text using tessaract api and OpenCV.",
    details: "https://raw.githubusercontent.com/DevPro13/OCR-ENGINE-LITE/refs/heads/main/README.md",
    stack: ["Tessaract", "OCR", "C++","OpenCV"],
    year: "2020",
    link: "https://github.com/DevPro13/OCR-ENGINE-LITE",
  },
  {
    id: 1,
    category: "Software",
    title: "Dijkstra-s-Algorithm-Visualizer",
    tag: "C++, Data Structure",
    image: "https://raw.githubusercontent.com/DevPro13/Dijkstra-s-Algorithm-Visualizer/refs/heads/main/Output/Demo.gif",
    bio: "A visualizer to visualize Dijkstra's shortest path finding algorithm. This is developed using C++.",
    details: "https://raw.githubusercontent.com/DevPro13/Dijkstra-s-Algorithm-Visualizer/refs/heads/main/README.md",
    stack: ["Queue", "Stack", "C++", "Greedy Algorithm","Shortest Path visual"],
    year: "2022",
    link: "https://github.com/DevPro13/Dijkstra-s-Algorithm-Visualizer",
  },
  {
    id: 2,
    category: "Hardware",
    title: "Startracker Simulator for Attitude Determination of Spacecraft",
    tag: "Startracker, CCD, Star Catalogue",
    image: "https://raw.githubusercontent.com/DevPro13/Startracker-Simulator-for-Attitude-Determination-of-Spacecrafts/refs/heads/main/Media/StarTracker.jpg",
    bio: "A prototype of startracker developed with Raspbarry PI 3 and PI Camera. A star image simulator was programmed to simulate star image. Star finding algorithms was used to calculate the orientation of satellite.",
    details: "https://raw.githubusercontent.com/DevPro13/OCR-ENGINE-LITE/refs/heads/main/README.md",
    stack: ["Raspberry PI", "PI Cam", "Star Catalogue", "Pyramid Search", "CCD Sensor"],
    year: "2023",
    link: "https://github.com/DevPro13/Startracker-Simulator-for-Attitude-Determination-of-Spacecrafts",
  },
  {
    id: 3,
    category: "Hardware",
    title: "RISC-V-Complete-Multicycle-Processor Design",
    tag: "VLSI design and verification",
    image: "https://raw.githubusercontent.com/DevPro13/RISC-V-Complete-Multicycle-Processor-Design/refs/heads/main/Img/risc-v%20complete.jpg",
    bio: "A complete multi-cycle processor was modelled and tested using System-Verilog.",
    details: "https://raw.githubusercontent.com/DevPro13/RISC-V-Complete-Multicycle-Processor-Design/refs/heads/main/README.md",
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
    bio: "A wearable technology to detect the event of falls and alert nearly people. Compose of wearable sensors and alerting systems. LSTM model was used to detect fall events.",
    details: "https://raw.githubusercontent.com/DevPro13/Fall-Detection-and-Alarming-Sys/refs/heads/main/README.md",
    stack: ["Python", "Arduino", "LSTM", "KICAD", "IMU"],
    year: "2024",
    link: "https://github.com/DevPro13/Fall-Detection-and-Alarming-Sys",
  },
  {
    id: 5,
    category: "Hardware",
    title: "Internet of Medical Things and Streaming",
    tag: "ESP32",
    image: "https://raw.githubusercontent.com/SanimKumarKhatri/IOT_Streaming/refs/heads/main/ESP_With_IMU/IoMT%20Block.png",
    bio: "Fall detection system was integrated with IoT technology. MQTT protocol was used to publish captured sensor data. A dashboard was created to visualize real time sensor data.",
    details: "https://raw.githubusercontent.com/SanimKumarKhatri/IOT_Streaming/refs/heads/main/ESP_With_IMU/README.md",
    stack: ["C++", "MongoDB", "MQTT Protocol", "IMU"],
    year: "2025",
    link: "https://github.com/SanimKumarKhatri/IOT_Streaming",
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("hardware");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next");
  const [animating, setAnimating] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const [readme, setReadme] = useState("");

  // ── Derived: filter by active tab, sort newest first ──────────────────────
  const filteredProjects = PROJECTS
    .filter((p) => p.category.toLowerCase() === activeTab)
    .sort((a, b) => Number(b.year) - Number(a.year));

  const total = filteredProjects.length;
  const project = filteredProjects[current] ?? filteredProjects[0];
  // ──────────────────────────────────────────────────────────────────────────

  // Fetch README whenever the active project changes
  useEffect(() => {
    if (!project) return;
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

  function switchTab(tab) {
    setActiveTab(tab);
    setCurrent(0);       // always start at the newest project
    setExpanded(false);
  }

  // Close expanded drawer on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!project) return null;

  return (
    <section id="projects" className="projects-section">
      {/* Label */}
      <div className="project-inner">
        <div className="project-label">
          <span className="label-line" />
          <span>Projects</span>
          <span className="label-line" />
        </div>
      </div>

      {/* Tab toggle */}
      <div className="proj-box">
        <div className="proj-toggle-wrap">
          <div className="proj-toggle">
            <span
              className={`toggle-glider ${activeTab === "software" ? "right" : ""}`}
              aria-hidden="true"
            />
            <button
              className={`toggle-btn ${activeTab === "hardware" ? "active" : ""}`}
              onClick={() => switchTab("hardware")}
            >
              <span className="toggle-icon">
                <img className="Hardwareicon" src={HardwareSign} alt="" />
              </span>
              Hardware
            </button>
            <button
              className={`toggle-btn ${activeTab === "software" ? "active" : ""}`}
              onClick={() => switchTab("software")}
            >
              <span className="toggle-icon">{"</>"}</span>
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
            <img src={project.image} alt={project.title} className="card-image" />
            <div className="card-image-overlay" />
            <span className="card-year">{project.year}</span>
          </div>

          {/* Body */}
          <div className="card-body">
            <h3 className="card-title">{project.title}</h3>
            <p className="card-bio">{project.bio}</p>

            <button
              className="expand-btn"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? "Collapse ↑" : "See README.md ↓"}
            </button>

            <div className={`card-details ${expanded ? "open" : ""}`}>
              <div className="details-text markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
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

        <div className="dot-row">
          {filteredProjects.map((_, i) => (
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