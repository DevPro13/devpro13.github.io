import React, { useState, useCallback, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import "./VisitorMap.css";

// ─────────────────────────────────────────────────────────
// VISITOR DATA  ← plug in your real analytics here
// code = ISO 3166-1 alpha-3 (react-simple-maps uses alpha-3)
// ─────────────────────────────────────────────────────────
const VISITOR_DATA = [
  { code: "USA", name: "United States",   visits: 1240, flag: "🇺🇸", lat:  38,    lng: -97    },
  { code: "IND", name: "India",           visits: 870,  flag: "🇮🇳", lat:  22,    lng:  80    },
  { code: "NPL", name: "Nepal",           visits: 634,  flag: "🇳🇵", lat:  28,    lng:  84    },
  { code: "GBR", name: "United Kingdom",  visits: 512,  flag: "🇬🇧", lat:  54,    lng:  -2    },
  { code: "DEU", name: "Germany",         visits: 388,  flag: "🇩🇪", lat:  51,    lng:  10    },
  { code: "CAN", name: "Canada",          visits: 310,  flag: "🇨🇦", lat:  56,    lng: -106   },
  { code: "AUS", name: "Australia",       visits: 278,  flag: "🇦🇺", lat: -25,    lng: 134    },
  { code: "JPN", name: "Japan",           visits: 245,  flag: "🇯🇵", lat:  37,    lng: 138    },
  { code: "FRA", name: "France",          visits: 198,  flag: "🇫🇷", lat:  46,    lng:   2    },
  { code: "SGP", name: "Singapore",       visits: 176,  flag: "🇸🇬", lat:   1.3,  lng: 103.8  },
  { code: "NLD", name: "Netherlands",     visits: 143,  flag: "🇳🇱", lat:  52,    lng:   5    },
  { code: "KOR", name: "South Korea",     visits: 132,  flag: "🇰🇷", lat:  37,    lng: 128    },
  { code: "BRA", name: "Brazil",          visits: 118,  flag: "🇧🇷", lat: -14,    lng: -51    },
  { code: "PAK", name: "Pakistan",        visits: 104,  flag: "🇵🇰", lat:  30,    lng:  70    },
  { code: "CHN", name: "China",           visits:  97,  flag: "🇨🇳", lat:  35,    lng: 105    },
  { code: "SWE", name: "Sweden",          visits:  88,  flag: "🇸🇪", lat:  63,    lng:  18    },
  { code: "CHE", name: "Switzerland",     visits:  76,  flag: "🇨🇭", lat:  47,    lng:   8    },
  { code: "NGA", name: "Nigeria",         visits:  64,  flag: "🇳🇬", lat:   9,    lng:   8    },
  { code: "ZAF", name: "South Africa",    visits:  57,  flag: "🇿🇦", lat: -30,    lng:  25    },
  { code: "MEX", name: "Mexico",          visits:  49,  flag: "🇲🇽", lat:  23,    lng: -102   },
];

const visitMap = Object.fromEntries(VISITOR_DATA.map(c => [c.code, c]));
const TOTAL    = VISITOR_DATA.reduce((s, c) => s + c.visits, 0);
const MAX      = Math.max(...VISITOR_DATA.map(c => c.visits));

// Colour scale: deep navy → electric lime
const colorScale = scaleLinear()
  .domain([0, MAX * 0.12, MAX * 0.4, MAX])
  .range(["#163328", "#1a5c3a", "#22a355", "#c8f064"]);

// Public Natural Earth TopoJSON — no API key required
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ─────────────────────────────────────────────────────────
// Leaderboard row list
// ─────────────────────────────────────────────────────────
const CountryList = memo(function CountryList({
  sorted, sortBy, setSortBy, activeCode, setActiveCode, setHovered,
}) {
  return (
    <div className="vm-leaderboard">
      <div className="vm-lb-header">
        <span className="vm-lb-title">Country Breakdown</span>
        <div className="vm-lb-sort">
          <button className={sortBy === "visits" ? "active" : ""} onClick={() => setSortBy("visits")}>
            By visits
          </button>
          <button className={sortBy === "name" ? "active" : ""} onClick={() => setSortBy("name")}>
            A – Z
          </button>
        </div>
      </div>
      <div className="vm-lb-list">
        {sorted.map((c, i) => (
          <div
            key={c.code}
            className={`vm-lb-row ${activeCode === c.code ? "active" : ""}`}
            onMouseEnter={() => setHovered(c.code)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActiveCode(prev => prev === c.code ? null : c.code)}
          >
            <span className="vm-lb-rank">{sortBy === "visits" ? `#${i + 1}` : "·"}</span>
            <span className="vm-lb-flag">{c.flag}</span>
            <span className="vm-lb-name">{c.name}</span>
            <div className="vm-lb-bar-track">
              <div className="vm-lb-bar" style={{ width: `${(c.visits / MAX) * 100}%` }} />
            </div>
            <span className="vm-lb-count">{c.visits.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────
export default function VisitorMap() {
  const [tooltip,    setTooltip]    = useState(null);
  const [hovered,    setHovered]    = useState(null);
  const [activeCode, setActiveCode] = useState(null);
  const [sortBy,     setSortBy]     = useState("visits");

  const sorted = [...VISITOR_DATA].sort((a, b) =>
    sortBy === "visits" ? b.visits - a.visits : a.name.localeCompare(b.name)
  );

  const activeData = activeCode ? visitMap[activeCode] : null;

  // react-simple-maps passes geo + evt to event handlers
  const handleEnter = useCallback((geo, evt) => {
    const code = geo.id;           // Natural Earth numeric → kept as string by RSM
    const alpha3 = numToAlpha3[code];
    const data   = alpha3 ? visitMap[alpha3] : null;
    setHovered(alpha3 || code);
    if (data) setTooltip({ x: evt.clientX, y: evt.clientY, data });
  }, []);

  const handleMove = useCallback((geo, evt) => {
    setTooltip(prev => prev ? { ...prev, x: evt.clientX, y: evt.clientY } : null);
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  const handleClick = useCallback((geo) => {
    const alpha3 = numToAlpha3[geo.id];
    if (alpha3 && visitMap[alpha3]) {
      setActiveCode(prev => prev === alpha3 ? null : alpha3);
    }
  }, []);

  const getFill = useCallback((geo) => {
    const alpha3 = numToAlpha3[geo.id];
    const data   = alpha3 ? visitMap[alpha3] : null;
    if (!data) return "#0f1621";
    if (hovered === alpha3 || activeCode === alpha3) return "#e2ff80";
    return colorScale(data.visits);
  }, [hovered, activeCode]);

  const getStrokeWidth = useCallback((geo) => {
    const alpha3 = numToAlpha3[geo.id];
    return (hovered === alpha3 || activeCode === alpha3) ? 1.2 : 0.4;
  }, [hovered, activeCode]);

  const getStroke = useCallback((geo) => {
    const alpha3 = numToAlpha3[geo.id];
    return (hovered === alpha3 || activeCode === alpha3)
      ? "#c8f064"
      : "rgba(255,255,255,0.06)";
  }, [hovered, activeCode]);

  return (
    <section className="vm-section">
      <div className="vm-bg" aria-hidden="true" />

      {/* ── Header ───────────────────────────────────────── */}
      <div className="vm-header">
        <span className="vm-eyebrow">Global Reach</span>
        <h2 className="vm-heading">Visitor Map</h2>
        <p className="vm-subhead">
          Portfolio visitors across&nbsp;<strong>{VISITOR_DATA.length}</strong>&nbsp;countries
          &nbsp;·&nbsp;<strong>{TOTAL.toLocaleString()}</strong>&nbsp;total visits
        </p>
      </div>

      {/* ── Map ──────────────────────────────────────────── */}
      <div className="vm-map-wrap">
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 153, center: [0, 10] }}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <Sphere fill="#0d1219" stroke="rgba(255,255,255,0.07)" strokeWidth={0.6} />
          <Graticule stroke="rgba(255,255,255,0.03)" strokeWidth={0.4} />

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getFill(geo)}
                  stroke={getStroke(geo)}
                  strokeWidth={getStrokeWidth(geo)}
                  style={{
                    default: { outline: "none" },
                    hover:   { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={evt => handleEnter(geo, evt)}
                  onMouseMove={evt  => handleMove(geo, evt)}
                  onMouseLeave={() => handleLeave()}
                  onClick={() => handleClick(geo)}
                  className={numToAlpha3[geo.id] && visitMap[numToAlpha3[geo.id]] ? "geo-visited" : ""}
                />
              ))
            }
          </Geographies>

          {/* Pulse markers for high-traffic countries */}
          {VISITOR_DATA.filter(c => c.visits > 150).map(c => (
            <Marker key={c.code} coordinates={[c.lng, c.lat]}>
              <circle r={2.8} fill="#c8f064" stroke="#0d1219" strokeWidth={1} />
              <circle r={5} fill="none" stroke="#c8f064" strokeWidth={0.8} opacity={0.5}>
                <animate attributeName="r"              from="3"  to="14" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" from="0.6" to="0" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </Marker>
          ))}
        </ComposableMap>

        {/* Legend */}
        <div className="vm-legend-wrap">
          <div className="vm-legend-row">
            <span className="vm-legend-label">Fewer</span>
            <div className="vm-legend-gradient" />
            <span className="vm-legend-label">More visits</span>
          </div>
          <div className="vm-legend-unvisited">
            <span className="vm-unvisited-dot" />
            <span>No visits recorded</span>
          </div>
        </div>
      </div>

      {/* ── Tooltip (fixed so it escapes any overflow) ────── */}
      {tooltip && (
        <div
          className="vm-tooltip"
          style={{ position: "fixed", left: tooltip.x + 16, top: tooltip.y - 12, zIndex: 9999 }}
        >
          <span className="vm-tt-flag">{tooltip.data.flag}</span>
          <div>
            <div className="vm-tt-name">{tooltip.data.name}</div>
            <div className="vm-tt-visits">{tooltip.data.visits.toLocaleString()} visits</div>
            <div className="vm-tt-pct">{((tooltip.data.visits / TOTAL) * 100).toFixed(1)}% of total</div>
          </div>
        </div>
      )}

      {/* ── Active country banner ─────────────────────────── */}
      {activeData && (
        <div className="vm-active-banner">
          <span className="vm-active-flag">{activeData.flag}</span>
          <div className="vm-active-info">
            <div className="vm-active-name">{activeData.name}</div>
            <div className="vm-active-visits">{activeData.visits.toLocaleString()} visits</div>
          </div>
          <div className="vm-active-bar-track">
            <div className="vm-active-bar" style={{ width: `${(activeData.visits / MAX) * 100}%` }} />
          </div>
          <div className="vm-active-pct">{((activeData.visits / TOTAL) * 100).toFixed(1)}%</div>
          <button className="vm-active-close" onClick={() => setActiveCode(null)}>✕</button>
        </div>
      )}

      {/* ── Stats strip ───────────────────────────────────── */}
      <div className="vm-stats-strip">
        {[
          { num: VISITOR_DATA.length,                                  label: "Countries"    },
          { num: TOTAL.toLocaleString(),                               label: "Total Visits" },
          { num: `${VISITOR_DATA[0].flag} ${VISITOR_DATA[0].name}`,   label: "Top Country"  },
          { num: Math.round(TOTAL / VISITOR_DATA.length).toLocaleString(), label: "Avg / Country" },
        ].map((s, i) => (
          <div className="vm-stat" key={i}>
            <span className="vm-stat-num">{s.num}</span>
            <span className="vm-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Leaderboard ───────────────────────────────────── */}
      <CountryList
        sorted={sorted}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeCode={activeCode}
        setActiveCode={setActiveCode}
        setHovered={setHovered}
      />
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// ISO numeric (Natural Earth) → alpha-3 lookup
// world-atlas 110m encodes country id as ISO numeric string
// ─────────────────────────────────────────────────────────
const numToAlpha3 = {
  "004":"AFG","008":"ALB","012":"DZA","024":"AGO","032":"ARG","036":"AUS",
  "040":"AUT","050":"BGD","056":"BEL","064":"BTN","068":"BOL","076":"BRA",
  "100":"BGR","104":"MMR","116":"KHM","120":"CMR","124":"CAN","152":"CHL",
  "156":"CHN","170":"COL","178":"COG","188":"CRI","192":"CUB","203":"CZE",
  "208":"DNK","218":"ECU","818":"EGY","231":"ETH","246":"FIN","250":"FRA",
  "266":"GAB","276":"DEU","288":"GHA","300":"GRC","320":"GTM","324":"GIN",
  "332":"HTI","340":"HND","348":"HUN","356":"IND","360":"IDN","364":"IRN",
  "368":"IRQ","372":"IRL","376":"ISR","380":"ITA","388":"JAM","392":"JPN",
  "400":"JOR","398":"KAZ","404":"KEN","408":"PRK","410":"KOR","414":"KWT",
  "418":"LAO","422":"LBN","430":"LBR","434":"LBY","484":"MEX","504":"MAR",
  "508":"MOZ","516":"NAM","524":"NPL","528":"NLD","554":"NZL","558":"NIC",
  "566":"NGA","578":"NOR","586":"PAK","591":"PAN","604":"PER","608":"PHL",
  "616":"POL","620":"PRT","634":"QAT","642":"ROU","643":"RUS","646":"RWA",
  "682":"SAU","686":"SEN","694":"SLE","706":"SOM","710":"ZAF","724":"ESP",
  "144":"LKA","729":"SDN","752":"SWE","756":"CHE","760":"SYR","764":"THA",
  "768":"TGO","780":"TTO","788":"TUN","792":"TUR","800":"UGA","804":"UKR",
  "784":"ARE","826":"GBR","840":"USA","858":"URY","860":"UZB","862":"VEN",
  "704":"VNM","887":"YEM","894":"ZMB","716":"ZWE","191":"HRV","703":"SVK",
  "705":"SVN","232":"ERI","180":"COD","706":"SOM","270":"GMB","288":"GHA",
  "624":"GNB","426":"LSO","454":"MWI","466":"MLI","478":"MRT","562":"NER",
  "646":"RWA","686":"SEN","694":"SLE","729":"SDN","800":"UGA","834":"TZA",
  "854":"BFA","860":"UZB","051":"ARM","031":"AZE","112":"BLR","268":"GEO",
  "398":"KAZ","417":"KGZ","762":"TJK","795":"TKM","860":"UZB","496":"MNG",
  "070":"BIH","807":"MKD","499":"MNE","688":"SRB","020":"AND","040":"AUT",
  "056":"BEL","100":"BGR","191":"HRV","196":"CYP","203":"CZE","208":"DNK",
  "233":"EST","246":"FIN","250":"FRA","276":"DEU","300":"GRC","348":"HUN",
  "352":"ISL","372":"IRL","380":"ITA","428":"LVA","438":"LIE","440":"LTU",
  "442":"LUX","470":"MLT","492":"MCO","528":"NLD","578":"NOR","616":"POL",
  "620":"PRT","642":"ROU","703":"SVK","705":"SVN","724":"ESP","752":"SWE",
  "756":"CHE","826":"GBR",
};