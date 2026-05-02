import React, { useState, useEffect, useRef } from "react";
import "./Publication.css";

// ── Replace with your own publications ───────────────────
const PUBLICATIONS = [
  {
    id: 1,
    type: "Journal",
    title:"Fall Detection System for Elderly People Using LSTM",
    authors: ["Sanim Kumar Khatri","Devraj Parajuli","Prayag Man Mane", "Bhupendra Chaulagain", "Sandesh Thapa"],
    venue: " Journal of Engineering Issues and Solutions",
    year: 2026,
    doi: "10.3126/joeis.v5i1.93497",
    overview:"This study addresses the consequences and effects of falls on elderly people and provides a low-powered wearable hardware solution embedded with an LSTM model for detecting fall events to enhance elderly safety.",
    abstract:
    "Falls are a leading cause of injury among older adults, requiring reliable real-time detection\
    systems that can intervene promptly. This study proposes a detection system as a wearable\
    device integrated with a six-axis Inertial Measurement Unit for sensing and a Raspberry Pi\
    Pico microcontroller using a Long Short-Term Memory network for inference. Volunteers\
    simulated elderly daily activities and fall cases to address practical constraints of real-world\
    elderly data acquisition. The proposed double-layer LSTM architecture achieved an accuracy\
    of 97.8%, compared to 92.19% obtained with the single-layer configuration, upon comparative\
    evaluation, with corresponding reductions in false-positive and false-negative rates in confusion\
    matrix analysis. The study highlights the potential of deep learning-based wearable technologies\
    deployed on low-power hardware to improve elderly safety. The findings support the integration\
    of wearable sensors and recurrent neural networks for monitoring and timely intervention for\
    individuals with high chances and at high risk of falls. Future work could focus on the expansion\
    of datasets, the integration of additional sensors, and testing in real-world environments.",
    keywords: ["Daily Activity Simulation", "Elderly", "Fall", "IMU Sensor", "LSTM", "Wearables"],
    link: "https://doi.org/10.3126/joeis.v5i1.93497",
    citations: 0,
  },
];

const TYPE_COLORS = {
    //Put color to paper category
  Journal: { bg: "rgba(200,240,100,0.10)", border: "rgba(200,240,100,0.3)", text: "#c8f064" },
//   Conference: { bg: "rgba(74,240,196,0.10)", border: "rgba(74,240,196,0.3)", text: "#4af0c4" },
//   Workshop: { bg: "rgba(160,120,255,0.10)", border: "rgba(160,120,255,0.3)", text: "#a078ff" },
};

function PaperCard({ pub, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const typeStyle = TYPE_COLORS[pub.type] || TYPE_COLORS.Journal;

  return (
    <article
      ref={ref}
      className={`pub-card ${visible ? "visible" : ""}`}
      style={{ "--delay": `${index * 0.1}s` }}
    >
      {/* Left accent bar */}
      <div className="pub-accent-bar" style={{ background: typeStyle.text }} />

      <div className="pub-main">
        {/* Top row */}
        <div className="pub-top-row">
          <span
            className="pub-type-badge"
            style={{
              background: typeStyle.bg,
              border: `1px solid ${typeStyle.border}`,
              color: typeStyle.text,
            }}
          >
            {pub.type}
          </span>
          <span className="pub-year">{pub.year}</span>
          {pub.citations > 0 && (
            <span className="pub-citations">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              {pub.citations} citations
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="pub-title">{pub.title}</h3>

        {/* Authors */}
        <p className="pub-authors">
          {pub.authors.map((a, i) => (
            <span key={i}>
              {a === "Devraj Parajuli" ? <strong>{a}</strong> : a}
              {i < pub.authors.length - 1 && <span className="author-sep">, </span>}
            </span>
          ))}
        </p>
        {/* Venue */}
        <p className="pub-venue">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {pub.venue}
        </p>
         <p className="paper-overview">
          {pub.overview}
        </p>

        {/* Expandable abstract */}
        <div className={`pub-abstract-wrap ${open ? "open" : ""}`}>
          <div className="pub-abstract-inner">
            <p className="pub-abstract">{pub.abstract}</p>
            <div className="pub-keywords">
              {pub.keywords.map((k) => (
                <span className="kw-chip" key={k}>{k}</span>
              ))}
            </div>
            <p className="pub-doi">
              DOI:&nbsp;
              <a href={pub.link} target="_blank" rel="noreferrer" className="doi-link">
                {pub.doi}
              </a>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pub-actions">
          <button
            className="pub-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? "Hide Abstract ↑" : "View Abstract ↓"}
          </button>
          <a
            href={pub.link}
            target="_blank"
            rel="noreferrer"
            className="pub-read-link"
          >
            Read Paper →
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Publication() {
  const [filter, setFilter] = useState("All");
  const types = ["All", ...Array.from(new Set(PUBLICATIONS.map((p) => p.type)))];
  const filtered =
    filter === "All" ? PUBLICATIONS : PUBLICATIONS.filter((p) => p.type === filter);

  return (
    <section className="pub-section">
      <div className="pub-bg-lines" aria-hidden="true" />

      {/* Header */}
      <div className="pub-header">
        <h2 className="pub-heading">Publications</h2>
        <p className="pub-subhead">
        </p>
      </div>

      {/* Filter pills */}
      <div className="pub-filters">
        {types.map((t) => (
          <button
            key={t}
            className={`filter-pill ${filter === t ? "active" : ""}`}
            onClick={() => setFilter(t)}
          >
            {t}
            <span className="filter-count">
              {t === "All" ? PUBLICATIONS.length : PUBLICATIONS.filter((p) => p.type === t).length}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="pub-list">
        {filtered.map((pub, i) => (
          <PaperCard key={pub.id} pub={pub} index={i} />
        ))}
      </div>
    </section>
  );
}