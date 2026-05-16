import React, { useState, useEffect, useCallback } from "react";
import "./Projects.css";
import HardwareSign from "./images/electronics.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PROJECTS = [
  {
    id: 1,
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
    id: 2,
    category: "Software",
    title: "29 Card Game Play: SmartBot using RUST",
    tag: "RUST, MCTS",
    image: "https://raw.githubusercontent.com/DevPro13/DumbBot/refs/heads/main/DumbBotVSSmartBotDemo.gif",
    bio: "A smart bot to play 29-Card Game with another bot.",
    details: "https://raw.githubusercontent.com/DevPro13/DumbBot/refs/heads/main/README.md",
    stack: ["RUST", "MCTS", "Actix-web","SerdeJSON"],
    year: "2023",
    link: "https://github.com/DevPro13/DumbBot",
  },
  {
    id: 3,
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
    id: 4,
    category: "Hardware",
    title: "Startracker Simulator for Attitude Determination of Spacecraft",
    tag: "Startracker, CCD, Star Catalogue",
    image: "https://raw.githubusercontent.com/DevPro13/Startracker-Simulator-for-Attitude-Determination-of-Spacecrafts/refs/heads/main/Media/StarTracker.jpg",
    bio: "A prototype of startracker developed with Raspbarry PI 3 and PI Camera. A star image simulator was programmed to simulate star image. Star finding algorithms was used to calculate the orientation of satellite.",
    details: "https://raw.githubusercontent.com/DevPro13/OCR-ENGINE-LITE/refs/heads/main/README.md",
    stack: ["Raspberry PI", "PI Cam", "Star Catalogue", "Pyramid Search", "CCD Sensor"],
    year: "2024",
    link: "https://github.com/DevPro13/Startracker-Simulator-for-Attitude-Determination-of-Spacecrafts",
  },
  {
    id: 5,
    category: "Hardware",
    title: "RISC-V-Complete-Multicycle-Processor Design",
    tag: "VLSI design and verification",
    image: "https://raw.githubusercontent.com/DevPro13/RISC-V-Complete-Multicycle-Processor-Design/refs/heads/main/Img/risc-v%20complete.jpg",
    bio: "A complete multi-cycle processor was modelled and tested using System-Verilog.",
    details: "https://raw.githubusercontent.com/DevPro13/RISC-V-Complete-Multicycle-Processor-Design/refs/heads/main/README.md",
    stack: ["Python", "NumPy", "Matplotlib", "Qiskit (validation)"],
    year: "2024",
    link: "https://github.com/DevPro13/RISC-V-Complete-Multicycle-Processor-Design",
  },
  {
    id: 6,
    category: "Hardware",
    title: "Fall Detection and Alerting System",
    tag: "Fall Detection, Hardware Design, PI processor",
    image: "https://raw.githubusercontent.com/DevPro13/Fall-Detection-and-Alarming-Sys/refs/heads/main/Resources/Images/IMG_20241230_154448.jpg",
    bio: "A wearable technology to detect the event of falls and alert nearly people. Compose of wearable sensors and alerting systems. LSTM model was used to detect fall events.",
    details: "https://raw.githubusercontent.com/DevPro13/Fall-Detection-and-Alarming-Sys/refs/heads/main/README.md",
    stack: ["Python", "Arduino", "LSTM", "KICAD", "IMU"],
    year: "2023",
    link: "https://github.com/DevPro13/Fall-Detection-and-Alarming-Sys",
  },
  {
    id: 7,
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
function ReadmeModal({ project, onClose }) {
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(true);
 
  // Fetch README when modal mounts
  useEffect(() => {
    fetch(project.details)
      .then((r) => r.text())
      .then((text) => { setReadme(text); setLoading(false); })
      .catch(() => { setReadme("_README not available._"); setLoading(false); });
  }, [project.details]);
 
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
 
  //Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
 
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} // prevent backdrop click inside box
      >
        {/* Modal header */}
        <div className="modal-header">
          <h3 className="modal-title">{project.title}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
 
        {/* Scrollable README body */}
        <div className="modal-body markdown-body">
          {loading
            ? <p className="readme-loading">Loading README…</p>
            : <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
          }
        </div>
 
        {/* Modal footer */}
        <div className="modal-footer">
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
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
 
//Individual project card
function ProjectCard({ project, onReadmeOpen }) {
  return (
    <div className="proj-card">
      <div className="card-image-wrap">
        <img src={project.image} alt={project.title} className="card-image" />
        <div className="card-image-overlay" />
        <span className="card-year">{project.year}</span>
      </div>
 
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        {project.bio && <p className="card-bio">{project.bio}</p>}
        <div className="stack-row">
          {project.stack.map((s) => (
            <span className="stack-chip" key={s}>{s}</span>
          ))}
        </div>
        <div className="card-footer">
          <button
            className="expand-btn"
            onClick={() => onReadmeOpen(project)}
          >
            See README.md ↗
          </button>
          <a
            href={project.link}
            className="proj-link-inline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
 
const VISIBLE_COUNT = 4;// no of projects tiles to display

export default function Projects() {
  const [activeTab, setActiveTab]       = useState("hardware");
  const [modalProject, setModalProject] = useState(null);
  const [showAll, setShowAll]           = useState(false);
 
  const filteredProjects = PROJECTS
    .filter((p) => p.category.toLowerCase() === activeTab)
    .sort((a, b) => Number(b.year) - Number(a.year));
 
  const hasMore         = filteredProjects.length > VISIBLE_COUNT;
  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, VISIBLE_COUNT);
 
  // Reset "show all" when switching tabs
  function switchTab(tab) {
    setActiveTab(tab);
    setShowAll(false);
  }
 
  const closeModal = useCallback(() => setModalProject(null), []);
 
  return (
    <section id="projects" className="projects-section">
      {/* Section label */}
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
 
      {/* Tile grid */}
      <div className="projects-grid">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onReadmeOpen={setModalProject}
          />
        ))}
      </div>
 
      {/* View More/Show Less projects if there are more than 4 projects */}
      {hasMore && (
        <div className="view-more-wrap">
          <button
            className="view-more-btn"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll
              ? `Show Less ↑`
              : `View More (${filteredProjects.length - VISIBLE_COUNT} more) ↓`}
          </button>
        </div>
      )}
      {/* View README.md window */}
      {modalProject && (
        <ReadmeModal project={modalProject} onClose={closeModal} />
      )}
    </section>
  );
}