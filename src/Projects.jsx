import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";

// ── Sample project data — replace with your own ──────────
const PROJECTS = [
  {
    id: 1,
    title: "NeuroChip-ML",
    tag: "VLSI · Machine Learning",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    bio: "A neuromorphic processing chip architecture optimized for on-device inference of deep neural networks at ultra-low power.",
    details:
      "NeuroChip-ML is a full custom VLSI design implementing a spiking neural network accelerator in 28 nm CMOS. The architecture features 512 leaky integrate-and-fire neurons arranged in a crossbar topology with local SRAM synaptic weights. Power consumption was reduced by 74 % compared to the baseline digital implementation through clock-gating, operand isolation, and a custom power-domain controller designed in Cadence Virtuoso. Layout vs. schematic (LVS) verification was performed in Mentor Calibre.",
    stack: ["Cadence Virtuoso", "Synopsys Design Compiler", "Python", "MATLAB"],
    year: "2024",
    link: "#",
  },
  {
    id: 2,
    title: "CloudSense IoT",
    tag: "Embedded · Cloud",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
    bio: "End-to-end IoT pipeline for real-time environmental monitoring with edge inference and AWS-based data engineering.",
    details:
      "CloudSense deploys a fleet of STM32-based sensor nodes that perform on-device anomaly detection using a quantized CNN (TFLite Micro). Data is streamed over MQTT to an AWS IoT Core broker, processed by Lambda functions, stored in DynamoDB, and visualised through a Next.js dashboard. The project achieved sub-50 ms end-to-end latency from sensor event to dashboard update across 120 deployed nodes.",
    stack: ["STM32", "AWS IoT Core", "TFLite Micro", "Next.js", "DynamoDB"],
    year: "2023",
    link: "#",
  },
  {
    id: 3,
    title: "QuantumSim",
    tag: "Quantum Computing",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    bio: "A Python-based quantum circuit simulator supporting up to 20 qubits with noise modelling and gate-level visualisation.",
    details:
      "QuantumSim implements a full statevector simulator using NumPy tensor contractions. Supports all standard single- and two-qubit gates, mid-circuit measurements, and Kraus-operator noise channels. A custom Matplotlib renderer produces publication-quality circuit diagrams. The simulator was validated against IBM Qiskit on a suite of 400 reference circuits with < 1 e-10 state fidelity error. Performance benchmarks show 3× speed-up over Qiskit's statevector backend for circuits up to 16 qubits.",
    stack: ["Python", "NumPy", "Matplotlib", "Qiskit (validation)"],
    year: "2023",
    link: "#",
  },
  {
    id: 4,
    title: "NanoFET Optimizer",
    tag: "Nanotechnology · ML",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80",
    bio: "ML-driven parameter extraction and optimization for sub-10 nm FinFET devices, cutting characterization time by 60 %.",
    details:
      "NanoFET Optimizer uses a Gaussian Process surrogate model trained on TCAD simulation data (Silvaco Atlas) to predict FinFET I-V characteristics from geometric parameters. Bayesian optimization then navigates the design space to meet leakage and drive-current targets. The tool reduced the number of expensive TCAD simulation runs from ~3 000 to ~400 for a typical optimization task, while achieving < 2 % error on threshold voltage prediction across 1 200 test devices.",
    stack: ["Python", "Scikit-learn", "GPyTorch", "Silvaco Atlas", "Pandas"],
    year: "2022",
    link: "#",
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next"); // "next" | "prev"
  const [animating, setAnimating] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  const total = PROJECTS.length;
  const project = PROJECTS[current];

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
    <section className="projects-section">
      {/* Background orbs */}
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />

      {/* Header */}
      <div className="proj-header">
        <span className="proj-eyebrow">Selected Work</span>
        <h2 className="proj-heading">Projects</h2>
        <p className="proj-subhead">
          A curated selection of engineering and research projects.
        </p>
      </div>

      {/* Counter */}
      <div className="proj-counter">
        <span className="counter-current">{String(current + 1).padStart(2, "0")}</span>
        <span className="counter-sep" />
        <span className="counter-total">{String(total).padStart(2, "0")}</span>
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
            <span className="card-tag">{project.tag}</span>
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
              {expanded ? "Collapse ↑" : "See Details ↓"}
            </button>

            {/* Expanded drawer */}
            <div className={`card-details ${expanded ? "open" : ""}`}>
              <p className="details-text">{project.details}</p>
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