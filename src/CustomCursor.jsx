import { useEffect, useRef } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top  = e.clientY + "px";
      cursor.classList.add("cursor-visible");
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el && el.closest("a, button")) {
        cursor.classList.add("cursor-grow");
      } else {
        cursor.classList.remove("cursor-grow");
      }
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return <div className="cursor" ref={cursorRef} />;
}