import React, { useState, useEffect, useRef } from "react";
import "./Blogs.css";

// ── Replace with your own blog posts ─────────────────────
const BLOGS = [
  {
    id: 1,
    title: "Why Neuromorphic Chips Are the Future of Edge AI",
    slug: "neuromorphic-chips-edge-ai",
    category: "VLSI",
    date: "Apr 12, 2024",
    readTime: "8 min read",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    excerpt:
      "Conventional von Neumann architectures hit a wall when deployed at the edge. Neuromorphic designs sidestep the memory bottleneck entirely — here's how spiking neural networks change the calculus.",
    body: `When we talk about edge inference today, the conversation inevitably circles back to power. A smartphone NPU draws watts; an IoT sensor node has milliwatts to spare. Closing that gap requires rethinking the substrate itself.\n\nNeuromorphic processors mimic the brain's event-driven signalling. Instead of clocking every neuron on every cycle, a spike propagates only when a threshold is crossed — slashing switching activity by orders of magnitude. Our 28 nm prototype achieved 74 % lower power than an equivalent fixed-point accelerator running the same DVS Gesture benchmark.\n\nThe key insight is locality: compute happens where the data lives. No round-trip to DRAM, no pipeline stall waiting on a memory controller. Synaptic weights sit in dense SRAM arrays co-located with the neurons they feed, and the crossbar topology means every weight is reachable in a single cycle.\n\nThis is not science fiction. Intel's Loihi 2, IBM's NorthPole, and a growing cohort of academic designs have demonstrated that the paradigm works at real-world tasks — keyword spotting, gesture recognition, sparse-event SLAM. The missing piece has always been tooling, and that gap is closing fast.`,
    tags: ["Neuromorphic", "Edge AI", "VLSI", "Low Power"],
    featured: true,
  },
  {
    id: 2,
    title: "Gaussian Processes for TCAD Surrogate Modelling",
    slug: "gp-tcad-surrogate",
    category: "ML",
    date: "Nov 3, 2023",
    readTime: "6 min read",
    cover: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=80",
    excerpt:
      "Running thousands of TCAD simulations per design iteration is a luxury no tape-out schedule affords. Gaussian Process surrogates compress that cost dramatically — with calibrated uncertainty to boot.",
    body: `Device simulation is expensive. A single Silvaco Atlas run for a 3D FinFET can take 40 minutes on a workstation. A parameter sweep over gate length, fin width, doping profile, and oxide thickness balloons to thousands of runs before you've even touched the objective function.\n\nGaussian Processes offer a principled escape. Train on a few hundred Latin-hypercube samples, and the GP posterior gives you a mean prediction plus a confidence interval at any untried point — for free. That uncertainty estimate is the secret weapon: Bayesian optimisation uses it to balance exploration (query where we're unsure) against exploitation (query where the model says the target is good).\n\nIn our FinFET study, the surrogate cut simulation runs from ~3 000 to ~400 while hitting threshold-voltage targets within 2 %. The calibrated error bars also flagged three device geometries where the model was overconfident — exactly the regions where Atlas later revealed a DIBL anomaly we hadn't anticipated.\n\nThe workflow is now standard in our group: TCAD → GP surrogate → Bayesian optimisation → focused TCAD verification. Total wall-clock time dropped from three weeks to four days.`,
    tags: ["Gaussian Process", "TCAD", "Bayesian Opt", "FinFET"],
    featured: false,
  },
  {
    id: 3,
    title: "Building a 120-Node IoT Fleet on AWS IoT Core",
    slug: "iot-fleet-aws",
    category: "Cloud",
    date: "Jul 19, 2023",
    readTime: "10 min read",
    cover: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=900&q=80",
    excerpt:
      "Deploying embedded sensor nodes at scale surfaces problems that breadboard prototypes never reveal — certificate rotation, shadow desync, and the joys of OTA firmware at 3 AM.",
    body: `The first ten nodes were easy. The next hundred exposed every assumption we'd made about the network, the cloud backend, and our own patience.\n\nAWS IoT Core manages device identity through X.509 certificates pinned to Things in the registry. Rotating those certificates across a live fleet — without dropping a single MQTT session — required a shadow-state machine that took two iterations to get right. Lesson one: design for certificate lifecycle on day one, not day ninety.\n\nOn the edge, our STM32L4 nodes run TFLite Micro for local anomaly detection. The quantised CNN occupies 87 KB of flash and runs inference in 12 ms — well within the 100 ms budget before the next sensor sample. False-positive rate dropped 60 % compared to the threshold-based baseline, with no additional power draw because the accelerator clock-gates itself between frames.\n\nOTA firmware via AWS IoT Jobs turned out to be the most operationally fraught piece. Delta images helped, but a botched rollout to 40 nodes at 3 AM taught us to always stage: canary → 10 % → 50 % → 100 %, with automatic rollback on repeated crash-restart cycles. The fleet has been running continuously for eight months. Uptime: 99.3 %.`,
    tags: ["AWS IoT", "STM32", "TFLite Micro", "OTA", "Cloud"],
    featured: false,
  },
  {
    id: 4,
    title: "Quantum Circuit Simulation Without the Hype",
    slug: "quantum-circuit-simulation",
    category: "Quantum",
    date: "Mar 5, 2023",
    readTime: "7 min read",
    cover: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=900&q=80",
    excerpt:
      "Statevector simulation is still the most useful tool a quantum software developer has. Here's what the textbooks skip: memory walls, noise channels, and why 30 qubits is a very different problem from 20.",
    body: `Every introduction to quantum computing explains the statevector. Few explain what happens when you actually try to simulate one.\n\nFor n qubits, the statevector is a complex array of 2ⁿ amplitudes. At 20 qubits that's 1 048 576 complex numbers — about 16 MB in float32. At 30 qubits it's 16 GB. At 40 qubits you've exceeded the RAM of any workstation on the planet. This is not a software problem; it's physics.\n\nNoise makes things worse. A Kraus-operator noise channel on a single qubit requires applying up to four matrices to the statevector per gate — quadrupling the compute. For realistic device noise (T1 ≈ 100 µs, T2 ≈ 80 µs on superconducting qubits) you need to apply depolarising and dephasing channels after every operation. Our simulator handles this correctly, and the overhead is roughly 3× versus noiseless simulation.\n\nThe practical takeaway: for circuits up to 16–20 qubits, a well-implemented statevector simulator is faster than IBM Qiskit's default backend and gives exact amplitudes. Beyond that, tensor-network methods or density-matrix simulators with truncation are the only viable options short of real hardware.`,
    tags: ["Quantum Computing", "Simulation", "Noise", "NumPy"],
    featured: false,
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(BLOGS.map((b) => b.category)))];

// ── Share modal ───────────────────────────────────────────
function ShareModal({ blog, onClose }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}${window.location.pathname}#blog-${blog.slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareLinks = [
    {
      label: "Twitter / X",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "LinkedIn",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "WhatsApp",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      ),
      href: `https://wa.me/?text=${encodeURIComponent(blog.title + " " + url)}`,
    },
  ];

  // Close on backdrop click
  const backdropRef = useRef(null);
  const handleBackdrop = (e) => { if (e.target === backdropRef.current) onClose(); };

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="share-backdrop" ref={backdropRef} onClick={handleBackdrop}>
      <div className="share-modal">
        <button className="share-close" onClick={onClose} aria-label="Close">✕</button>
        <p className="share-label">Share this post</p>
        <h4 className="share-title">{blog.title}</h4>

        {/* Copy link */}
        <div className="share-copy-row">
          <span className="share-url">{url}</span>
          <button className={`share-copy-btn ${copied ? "copied" : ""}`} onClick={copyLink}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Social links */}
        <div className="share-socials">
          {shareLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="share-social-btn"
            >
              {s.icon}
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Read modal (full post) ────────────────────────────────
function ReadModal({ blog, onClose, onShare }) {
  const backdropRef = useRef(null);
  const handleBackdrop = (e) => { if (e.target === backdropRef.current) onClose(); };
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="read-backdrop" ref={backdropRef} onClick={handleBackdrop}>
      <div className="read-modal">
        {/* Header bar */}
        <div className="read-topbar">
          <button className="read-close" onClick={onClose}>← Back</button>
          <button className="read-share-btn" onClick={() => onShare(blog)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share
          </button>
        </div>

        {/* Cover */}
        <div className="read-cover">
          <img src={blog.cover} alt={blog.title} />
          <div className="read-cover-overlay" />
        </div>

        {/* Content */}
        <div className="read-content">
          <div className="read-meta-row">
            <span className="blog-category-badge">{blog.category}</span>
            <span className="read-date">{blog.date}</span>
            <span className="read-time">{blog.readTime}</span>
          </div>
          <h2 className="read-title">{blog.title}</h2>
          <div className="read-body">
            {blog.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="read-tags">
            {blog.tags.map((t) => (
              <span className="tag-chip" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Blog card ─────────────────────────────────────────────
function BlogCard({ blog, index, onRead, onShare }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      id={`blog-${blog.slug}`}
      className={`blog-card ${blog.featured ? "featured" : ""} ${visible ? "visible" : ""}`}
      style={{ "--delay": `${index * 0.09}s` }}
    >
      {/* Cover image */}
      <div className="blog-cover-wrap" onClick={() => onRead(blog)}>
        <img src={blog.cover} alt={blog.title} className="blog-cover" />
        <div className="blog-cover-overlay" />
        {blog.featured && <span className="featured-badge">Featured</span>}
        <span className="blog-category-badge card-cat">{blog.category}</span>
      </div>

      {/* Body */}
      <div className="blog-body">
        <div className="blog-meta">
          <span className="blog-date">{blog.date}</span>
          <span className="blog-dot">·</span>
          <span className="blog-read-time">{blog.readTime}</span>
        </div>

        <h3 className="blog-title" onClick={() => onRead(blog)}>{blog.title}</h3>
        <p className="blog-excerpt">{blog.excerpt}</p>

        <div className="blog-tags">
          {blog.tags.slice(0, 3).map((t) => (
            <span className="tag-chip" key={t}>{t}</span>
          ))}
        </div>

        <div className="blog-actions">
          <button className="blog-read-btn" onClick={() => onRead(blog)}>
            Read Post →
          </button>
          <button
            className="blog-share-icon"
            onClick={() => onShare(blog)}
            aria-label="Share post"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Main section ──────────────────────────────────────────
export default function Blogs() {
  const [filter, setFilter] = useState("All");
  const [reading, setReading] = useState(null);
  const [sharing, setSharing] = useState(null);

  const filtered =
    filter === "All" ? BLOGS : BLOGS.filter((b) => b.category === filter);

  const handleShare = (blog) => { setSharing(blog); };
  const handleRead  = (blog) => { setReading(blog); };

  return (
    <section className="blogs-section">
      <div className="blogs-bg" aria-hidden="true" />

      {/* Header */}
      <div className="blogs-header">
        <span className="blogs-eyebrow">Writing</span>
        <h2 className="blogs-heading">Blog</h2>
        <p className="blogs-subhead">
          Thoughts on VLSI, ML, quantum, and engineering at the edge.
        </p>
      </div>

      {/* Filters */}
      <div className="blogs-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`blogs-filter-pill ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="blogs-grid">
        {filtered.map((blog, i) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            index={i}
            onRead={handleRead}
            onShare={handleShare}
          />
        ))}
      </div>

      {/* Read modal */}
      {reading && (
        <ReadModal
          blog={reading}
          onClose={() => setReading(null)}
          onShare={(b) => { setReading(null); setSharing(b); }}
        />
      )}

      {/* Share modal */}
      {sharing && (
        <ShareModal blog={sharing} onClose={() => setSharing(null)} />
      )}
    </section>
  );
}