import './News.css';

export default function News() {
  return (
      <section id="news" className="news-section">
      {/* Background grid accent */}
      <div className="news-bg-lines" aria-hidden="true" />
 
      <div className="news-inner">
        {/* Label */}
        <div className="news-label">
          <span className="news-label-line" />
          <span>NEWS</span>
          <span className="news-label-line" />
        </div>
        {/* News */}
        <div class="news-list">

            <div class="news-item">
                <div class="news-date">2026</div>
                <p>Completed design and verification of a fixed-point self-attention accelerator in SystemVerilog, validated against a Python reference model.</p>
            </div>
            <div class="news-item">
              <div class="news-date">Apr 2026</div>
              <p>Paper "Fall Detection System for Elderly People Using LSTM" published in J. Eng. Iss. Solut.</p>
            </div>
            <div class="news-item">
                <div class="news-date">Apr 2025</div>
                <p>Started as Part-Time Lecturer at Tribhuvan University, teaching Microprocessors, Computer Architecture, and Embedded Systems.</p>
            </div>

            <div class="news-item">
                <div class="news-date">Aug 2024</div>
                <p>Teaching Assistant for the Samsung Innovation Campus Python program at IOE Pulchowk Campus.</p>
            </div>
               <div class="news-item">
                <div class="news-date">Jun 2024</div>
                <p>Joined Cedar Gate Technologies (an IQVIA Business) as SDET / Software Engineer - AI Automation.</p>
            </div>

            <div class="news-item">
                <div class="news-date">Apr 2024</div>
                <p>Graduated with a B.E. in Electronics and Communication from IOE Pulchowk Campus.</p>
            </div>
            <div class="news-item">
                <div class="news-date">2024</div>
                <p>Completed a RISC-V multicycle processor design in SystemVerilog.</p>
            </div>

            <div class="news-item">
                <div class="news-date">2024</div>
                <p>Completed undergraduate major project: a star tracker image simulator for spacecraft attitude determination.</p>
</div>
           
        </div>
      </div>
    </section>
  );
}