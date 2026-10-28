import './Research.css';

export default function Research() {
  return (
      <section id="research" className="research-section">
      {/* Background grid accent */}
      <div className="research-bg-lines" aria-hidden="true" />
 
      <div className="research-inner">
        {/* Label */}
        <div className="research-label">
          <span className="research-label-line" />
          <span>RESEARCH</span>
          <span className="research-label-line" />
        </div>
        {/* research */}
        <div class="research-list">
           <h2>Research Interests</h2>
            <ul>
              <li>Hardware accelerators for attention and matrix computation</li>
              <li>Fixed-point vs. floating-point number formats in low-precision inference</li>
              <li>Machine learning for electronic design automation (ML for EDA)</li>
              <li>RTL design and verification</li>
            </ul>
        </div>
      </div>
    </section>
  );
}