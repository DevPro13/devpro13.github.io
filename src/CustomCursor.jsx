import { useEffect, useRef } from "react";
import "./CustomCursor.css";
export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // ── Move cursor ──────────────────────────────────────────
    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top  = e.clientY + "px";
      cursor.classList.add("cursor-visible");
    };

    const onMouseOver = (e) => {
      if (e.target.closest("a, button")) {
        cursor.classList.add("cursor-grow");
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest("a, button")) {
        cursor.classList.remove("cursor-grow");
      }
    };

    document.addEventListener("mousemove",  moveCursor);
    document.addEventListener("mouseover",  onMouseOver);
    document.addEventListener("mouseout",   onMouseOut);

    return () => {
      document.removeEventListener("mousemove",  moveCursor);
      document.removeEventListener("mouseover",  onMouseOver);
      document.removeEventListener("mouseout",   onMouseOut);
    };
  }, []);

  return <div className="cursor" ref={cursorRef} />;
}